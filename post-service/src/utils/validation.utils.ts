import Joi, { ValidationResult } from 'joi';

interface PostDTO {
  content: string;
}

const validatePost = (data: PostDTO): ValidationResult => {
  const schema = Joi.object<PostDTO>({
    content: Joi.string().min(3).max(5000).required(),
  });

  return schema.validate(data);
};

export { validatePost };
