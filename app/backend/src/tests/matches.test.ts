import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/Match';

import { 
  allMatchesMock,
} from './mocks/matchesMocks';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Verifica a rota /matches', () => {
  describe('Testes relacionados as requisições do tipo GET: /matches', () => {
    afterEach(() => sinon.restore());

    it('Testando resposta caso requisição seja concluída', async () => {
      sinon.stub(Match, 'findAll').resolves(allMatchesMock as unknown[] as Match[])

      const response = await chai
      .request(app)
      .get('/matches')

      expect(response.status).to.be.eq(200);
      expect(response.body).to.length(2);
    });

  });

  describe('Testes relacionados as requisições do tipo GET: /matches?inProgress', () => {
    afterEach(() => sinon.restore());

    it('Testando resposta caso query seja true', async () => {
      sinon.stub(Match, 'findAll').resolves([allMatchesMock[1]] as unknown[] as Match[])

      const response = await chai
      .request(app)
      .get('/matches/?inProgress=true')

      expect(response.status).to.be.eq(200);
      expect(response.body).to.length(1)
      expect(response.body[0].inProgress).to.be.equal(true);
    });

    it('Testando resposta caso query seja false', async () => {
      sinon.stub(Match, 'findAll').resolves([allMatchesMock[0]] as unknown[] as Match[])

      const response = await chai
      .request(app)
      .get('/matches/?inProgress=false')

      expect(response.status).to.be.eq(200);
      expect(response.body).to.length(1);
      expect(response.body[0].inProgress).to.be.equal(false);
    });

  });

});
