import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';

// import { Response } from 'superagent';
import { 
  tokenMock,
  userMock,
  validLoginMock,
  invalidEmailMock,
  invalidPasswordMock,
  payloadMock,
} from './mocks/userMocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Verifica a rota /login', () => {
  describe('Testes relacionados as requisições do tipo POST: /login', () => {
    afterEach(() => sinon.restore());

    it('Testando caso email e password sejam válidos', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User)
      sinon.stub(jwt, 'sign').resolves(tokenMock);

      const response = await chai
      .request(app)
      .post('/login').send(validLoginMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq({token: tokenMock});
    });

    it('Testando caso email seja incorreto', async () => {
      sinon.stub(User, 'findOne').resolves(null)
      
      const response = await chai
      .request(app)
      .post('/login').send(invalidEmailMock)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.deep.eq({message: 'Incorrect email or password'});
    });

    it('Testando caso password seja incorreto', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User)

      const response = await chai
      .request(app)
      .post('/login').send(invalidPasswordMock)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.deep.eq({message: 'Incorrect email or password'});
    });

    it('Testando caso não exista o campo email na requisição', async () => {
      const response = await chai
      .request(app)
      .post('/login').send({password: 'myPassword'})

      expect(response.status).to.be.eq(400);
      expect(response.body).to.deep.eq({message: 'All fields must be filled'});
    });

    it('Testando caso não exista o campo password na requisição', async () => {
      const response = await chai
      .request(app)
      .post('/login').send( {email: 'teste@teste.com'} )

      expect(response.status).to.be.eq(400);
      expect(response.body).to.deep.eq({message: 'All fields must be filled'});
    });
  });

  describe('Testes relacionado as requisições do tipo GET: /login/validate', () => {
    afterEach(() => sinon.restore());

    it('Testando caso token seja válido', async () => {
      sinon.stub(jwt, 'verify').resolves({...payloadMock});

      const response = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq({role: 'admin'});
    });

    it('Testando caso token seja inválido', async () => {
      const response = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(401);
      expect(response.body).to.deep.eq({message: 'Invalid token'});
    });

    it('Testando caso token seja inexistente', async () => {
      const response = await chai
      .request(app)
      .get('/login/validate')

      expect(response.status).to.be.eq(401);
      expect(response.body).to.deep.eq({message: 'Token not found'});
    });
  })

});
