import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchService from '../database/services/match.service';

chai.use(chaiHttp);

const { expect } = chai;

describe('MatchController', () => {
  let matchServiceStub: sinon.SinonStub;
  const matchService = new MatchService();

  before(() => {
    matchServiceStub = sinon.stub(matchService, 'createMatch').resolves({ id: 1, ...<Seu mock> });
  });

  after(() => {
    matchServiceStub.restore();
  });

  it('should create a match', async () => {
    const match = { ...<Seus dados de teste> };

    const res = await chai.request(app).post('/api/matches').send(match);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('id').to.be.a('number');
    // Verifique outras propriedades ou mensagens conforme necessário
  });

  it('should get matches', async () => {
    const res = await chai.request(app).get('/api/matches');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
    // Verifique outras propriedades ou mensagens conforme necessário
  });

  it('should update a match', async () => {
    const matchId = 1;

    const res = await chai.request(app).patch(`/api/matches/${matchId}/finish`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').to.equal('Finished');
    // Verifique outras propriedades ou mensagens conforme necessário
  });

  it('should update a match result', async () => {
    const matchId = 1;
    const matchResult = { homeTeamGoals: 2, awayTeamGoals: 1 };

    const res = await chai.request(app).patch(`/api/matches/${matchId}`).send(matchResult);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').to.equal('Result altered');
    // Verifique outras propriedades ou mensagens conforme necessário
  });
});
function before(arg0: () => void) {
    throw new Error('Function not implemented.');
}

function after(arg0: () => void) {
    throw new Error('Function not implemented.');
}

