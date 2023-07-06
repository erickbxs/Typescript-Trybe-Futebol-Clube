import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { teamsListMock, teamByIdMock } from './mock/Teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Testando findAll', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsListMock as any);
    const chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.body).to.deep.equal(teamsListMock);
    expect(chaiHttpResponse.status).to.equal(200);
  });

  it('Testando findById', async () => {
    sinon.stub(TeamsModel, 'findOne').resolves(teamByIdMock as any);
    const chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.body).to.deep.equal(teamByIdMock);
    expect(chaiHttpResponse.status).to.equal(200);
  })})