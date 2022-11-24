import * as Joi from 'joi';

const loginSchema: Joi.Schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default loginSchema;
export {
  loginSchema,
};
