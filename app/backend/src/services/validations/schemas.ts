import * as Joi from 'joi';

const FIELD_REQUIRED = 'All fields must be filled';
const EMAIL_REQUIRED = 'Incorrect email or password';

const loginSchema: Joi.Schema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
    'string.email': EMAIL_REQUIRED,
  }),
  password: Joi.string().required().messages({
    'string.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
});

export default loginSchema;
export {
  loginSchema,
};
