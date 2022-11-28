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

const matchScoreSchema: Joi.Schema = Joi.object({
  homeTeamGoals: Joi.number().min(0).required().messages({
    'number.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
  awayTeamGoals: Joi.number().min(0).required().messages({
    'number.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
});

const newMatchSchema: Joi.Schema = Joi.object({
  homeTeam: Joi.number().min(1).required().messages({
    'number.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
  awayTeam: Joi.number().min(1).required().messages({
    'number.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
  homeTeamGoals: Joi.number().min(0).required().messages({
    'number.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
  awayTeamGoals: Joi.number().min(0).required().messages({
    'number.empty': FIELD_REQUIRED,
    'any.required': FIELD_REQUIRED,
  }),
});

export {
  loginSchema,
  newMatchSchema,
  matchScoreSchema,
};
