import Joi, { ValidationResult } from 'joi';

interface PostDTO {
  content: string;
  mediaIds?: string[];
}

const validatePost = (data: PostDTO): ValidationResult => {
  const schema = Joi.object<PostDTO>({
    content: Joi.string().min(3).max(5000).required(),
    mediaIds: Joi.array().items(Joi.string()).optional(),
  });

  return schema.validate(data);
};

export { validatePost };
