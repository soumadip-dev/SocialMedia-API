import type { Request, Response } from 'express';
import type { MessageResponse } from '../interfaces/message-response';
import type { ErrorResponse } from '../interfaces/error-response';
import logger from '../utils/logger.utils';
import { validateLogin, validateRegister } from '../utils/validation.utils';
import { User } from '../models/User.model';
import generateTokens from '../utils/generateToken.utils';
import { RefreshToken } from '../models/RefreshToken.model';

//* Controller to register user
const registerUser = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Register endpoint hit 🎯');
  try {
    // Validate incoming request body
    const { error } = validateRegister(req.body);

    if (error) {
      logger.warn(`Validation error: ${error.details[0].message} ⚠️`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password, username } = req.body;

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      logger.warn('User registration failed: Email or username already exists 🚫');
      return res.status(409).json({
        success: false,
        message: 'Email or username already taken',
      });
    }

    // Create new user
    user = new User({ username, email, password });

    await user.save();
    logger.info(`User registered successfully with ID: ${user._id} ✅`);

    // Generate access and refresh tokens
    const { acccessToken, refreshToken } = await generateTokens(user);

    return res.status(201).json({
      message: 'User registered successfully!',
      success: true,
      data: { acccessToken, refreshToken, userId: user._id },
    });
  } catch (error) {
    logger.error('Error during user registration ❌', error); // Log unexpected errors
    return res.status(500).json({
      message: 'Registration failed due to server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller to login user
const loginUser = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Login endpoint hit 🎯');
  try {
    // Validate incoming request body
    const { error } = validateLogin(req.body);

    if (error) {
      logger.warn(`Validation error: ${error.details[0].message} ⚠️`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`Login failed: User with email "${email}" not found 🚫`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Validate password
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      logger.warn(`Login failed: Invalid password for user with email "${email}" 🚫`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate access and refresh tokens
    const { acccessToken, refreshToken } = await generateTokens(user);

    logger.info(`User logged in successfully with ID: ${user._id} ✅`);

    return res.status(200).json({
      message: 'Login successful!',
      success: true,
      data: {
        acccessToken,
        refreshToken,
        userId: user._id,
      },
    });
  } catch (error) {
    logger.error('Error during user login ❌', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed due to server error',
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller to refresh token
const refreshTokenUser = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Refresh token endpoint hit 🎯');
  try {
    const { refreshToken } = req.body;

    // Validate refresh token presence
    if (!refreshToken) {
      logger.warn('Refresh token refresh failed: Refresh token is missing 🚫');
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // Find the stored refresh token
    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    // Check if token exists and is not expired
    if (!storedToken) {
      logger.warn(`Refresh token refresh failed: Invalid refresh token 🚫`);
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    if (storedToken.expiresAt < new Date()) {
      logger.warn(`Refresh token refresh failed: Refresh token has expired 🚫`);
      return res.status(401).json({
        success: false,
        message: 'Refresh token has expired',
      });
    }

    // Find the user associated with the refresh token
    const user = await User.findById(storedToken.user);

    if (!user) {
      logger.warn(`Refresh token refresh failed: User not found 🚫`);
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate new access and refresh tokens
    const { acccessToken: newAccessToken, refreshToken: newRefreshToken } = await generateTokens(
      user
    );

    // Delete the old refresh token
    await RefreshToken.deleteOne({ _id: storedToken._id });

    logger.info(`Tokens refreshed successfully for user ID: ${user._id} ✅`);

    return res.status(200).json({
      message: 'Tokens refreshed successfully!',
      success: true,
      data: {
        acccessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    logger.error('Error during token refresh ❌', error);
    return res.status(500).json({
      success: false,
      message: 'Token refresh failed due to server error',
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller for logout
const logoutUser = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Logout endpoint hit 🎯');
  try {
    const { refreshToken } = req.body;

    // Validate refresh token presence
    if (!refreshToken) {
      logger.warn('Logout failed: Refresh token is missing 🚫');
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required',
      });
    }

    // Delete the refresh token from the database
    const result = await RefreshToken.deleteOne({ token: refreshToken });

    // Check if token was actually deleted (exists in database)
    if (result.deletedCount === 0) {
      logger.warn('Logout failed: Invalid or already revoked refresh token 🚫');
      return res.status(401).json({
        success: false,
        message: 'Invalid or already revoked refresh token',
      });
    }

    logger.info(`User logged out successfully. Refresh token deleted ✅`);

    return res.status(200).json({
      message: 'Logged out successfully!',
      success: true,
      data: {
        message: 'Refresh token has been revoked. Please clear client-side tokens.',
      },
    });
  } catch (error) {
    logger.error('Error during user logout ❌', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed due to server error',
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

export { registerUser, loginUser, refreshTokenUser, logoutUser };
