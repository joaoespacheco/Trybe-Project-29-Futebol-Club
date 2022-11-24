import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';

// import { Response } from 'superagent';
import { tokenMock, userMock, validLoginMock } from './mocks/userMocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Verifica a rota /login', () => {
  describe('Testes relacionados as requisições do tipo POST', () => {
    afterEach(() => sinon.restore());

    it('Testando caso email seja existente', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User)
      sinon.stub(jwt, 'sign').resolves(tokenMock);

      const response = await chai
      .request(app)
      .post('/login').send(validLoginMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.eq({token: tokenMock});
    });

    it('Testando caso email seja inexistente', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User)

      const response = await chai
      .request(app)
      .post('/login').send({password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'})

      expect(response.status).to.be.eq(400);
      expect(response.body).to.be.eq({message: 'All fields must be filled'});
    });
  });

});
