import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/TeamsModel';
chai.use(chaiHttp);
const { expect, request } = chai;

const teams = [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    },
    {
      "id": 3,
      "teamName": "Botafogo"
    },
    {
      "id": 4,
      "teamName": "Corinthians"
    },
    {
      "id": 5,
      "teamName": "Cruzeiro"
    },
    {
      "id": 6,
      "teamName": "Ferroviária"
    },
    {
      "id": 7,
      "teamName": "Flamengo"
    },
    {
      "id": 8,
      "teamName": "Grêmio"
    },
    {
      "id": 9,
      "teamName": "Internacional"
    },
    {
      "id": 10,
      "teamName": "Minas Brasília"
    },
    {
      "id": 11,
      "teamName": "Napoli-SC"
    },
    {
      "id": 12,
      "teamName": "Palmeiras"
    },
    {
      "id": 13,
      "teamName": "Real Brasília"
    },
    {
      "id": 14,
      "teamName": "Santos"
    },
    {
      "id": 15,
      "teamName": "São José-SP"
    },
    {
      "id": 16,
      "teamName": "São Paulo"
    }
  ]

describe('/teams', () => {
  describe('GET findAll', () => {

    before(() => {
      Sinon.stub(Team, 'findAll').resolves(teams as Team[])
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar todos os times', async () => {
      const response = await request(app).get('/teams');
      expect(response).to.have.status(200);
      expect(response).to.be.json;
      expect(response.body).to.deep.equal(teams);
      expect(response.body).to.be.an('array');
    });
  });
  describe('GET /id findOne', () => {

    before(() => {
      Sinon.stub(Team, 'findOne').resolves(teams[0] as Team)
    });

    after(() => {
      Sinon.restore();
    });

    it('Deve retornar todos os times', async () => {
      const response = await request(app).get('/teams/1');
      expect(response).to.have.status(200);
      expect(response).to.be.json;
      expect(response.body).to.deep.equal(teams[0]);
      expect(response.body).to.be.an('object');
    });
  });

});

function before(arg0: () => void) {
  throw new Error('Function not implemented.');
}


function after(arg0: () => void) {
  throw new Error('Function not implemented.');
}
