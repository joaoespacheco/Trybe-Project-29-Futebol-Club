import * as Joi from 'joi';
import ILogin from '../../interfaces/ILogin';
import HttpException from '../../Utils/HttpException';

class validations {
  public login = (schema: Joi.Schema, body: ILogin) => {
    const { error, value } = schema.validate(body);

    if (error) {
      throw new HttpException(400, 'All fields must be filled');
    }

    return { type: 'OK', value: { message: value } };
  };
}

export default validations;
