import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Match from '../database/models/Match';

import { 
  allMatchesMock,
  progressFalseMatchMock,
  progressTrueMatchMock,
  validMatchPostMock,
  invalidMatchPostMock,
  invalidTeamOnReqMock,
  newMatchMock,
  updateMatchMock
} from './mocks/matchesMocks';
import { 
  tokenMock,
  payloadMock,
} from './mocks/userMocks';
import { 
  allTeamsMock,
} from './mocks/teamsMocks';
import Team from '../database/models/Team';

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

  describe('Testes relacionados as requisições do tipo POST: /matches/', () => {
    afterEach(() => sinon.restore());

    it('Testando caso a criação da partida seja realizada com sucesso', async () => {
      sinon.stub(Team, 'findAll').resolves(allTeamsMock as unknown as Team[])
      sinon.stub(Match, 'create').resolves(newMatchMock as unknown as Match)
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .post('/matches/')
      .send(validMatchPostMock)
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(201);
      expect(response.body).to.deep.eq(newMatchMock)
    });

    it('Testando caso os times da requisição sejam iguais', async () => {
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .post('/matches/')
      .send(invalidMatchPostMock)
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(422);
      expect(response.body).to.deep.eq({message: 'It is not possible to create a match with two equal teams'})
    });

    it('Testando caso os times da requisição sejam iguais', async () => {
      sinon.stub(Team, 'findAll').resolves(allTeamsMock as unknown as Team[])
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .post('/matches/')
      .send(invalidTeamOnReqMock)
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(404);
      expect(response.body).to.deep.eq({message: 'There is no team with such id!'})
    });

  });

  describe('Testes relacionados as requisições do tipo GET: /matches?inProgress', () => {
    afterEach(() => sinon.restore());

    it('Testando resposta caso query seja true', async () => {
      sinon.stub(Match, 'findAll').resolves([progressTrueMatchMock] as unknown[] as Match[])

      const response = await chai
      .request(app)
      .get('/matches/?inProgress=true')

      expect(response.status).to.be.eq(200);
      expect(response.body).to.length(1)
      expect(response.body[0].inProgress).to.be.equal(true);
    });

    it('Testando resposta caso query seja false', async () => {
      sinon.stub(Match, 'findAll').resolves([progressFalseMatchMock] as unknown[] as Match[])

      const response = await chai
      .request(app)
      .get('/matches/?inProgress=false')

      expect(response.status).to.be.eq(200);
      expect(response.body).to.length(1);
      expect(response.body[0].inProgress).to.be.equal(false);
    });

  });

  describe('Testes relacionados as requisições do tipo PATCH: /matches/:id/finish', () => {
    afterEach(() => sinon.restore());

    it('Testando caso o id seja existente', async () => {
      sinon.stub(Match, 'findByPk').resolves(progressTrueMatchMock as unknown as Match)
      sinon.stub(Match, 'update').resolves([1])
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .patch('/matches/2/finish')
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq({ message: 'finished' })
    });

    it('Testando caso o id seja inexistente', async () => {
      sinon.stub(Match, 'findByPk').resolves(null)
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .patch('/matches/500/finish')
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(404);
      expect(response.body).to.deep.eq({ message: 'There is no match with such id!' })
    });

  });

  describe('Testes relacionados as requisições do tipo PATCH: /matches/:id', () => {
    afterEach(() => sinon.restore());

    it('Testando caso o id da partida seja existente', async () => {
      sinon.stub(Match, 'findByPk').resolves(progressTrueMatchMock as unknown as Match)
      sinon.stub(Match, 'update').resolves([1])
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .patch('/matches/2')
      .send(updateMatchMock)
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(200);
      expect(response.body).to.deep.eq({ message: 'Match updated' })
    });

    it('Testando caso o id da partida seja inexistente', async () => {
      sinon.stub(Match, 'findByPk').resolves(null)
      sinon.stub(jwt, 'verify').resolves(payloadMock);

      const response = await chai
      .request(app)
      .patch('/matches/500')
      .send(updateMatchMock)
      .set('authorization', tokenMock)

      expect(response.status).to.be.eq(404);
      expect(response.body).to.deep.eq({ message: 'There is no match with such id!' })
    });

  });
});
