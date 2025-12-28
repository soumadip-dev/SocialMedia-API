import Joi, { ValidationResult } from 'joi';

interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}
interface LoginDTO {
  email: string;
  password: string;
}

const validateRegister = (data: RegisterDTO): ValidationResult => {
  const schema = Joi.object<RegisterDTO>({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const validateLogin = (data: LoginDTO): ValidationResult => {
  const schema = Joi.object<LoginDTO>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export { validateRegister, validateLogin };
