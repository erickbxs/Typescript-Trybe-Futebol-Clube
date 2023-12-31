import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import MatcheModel from "../database/models/MatchModel";
import TeamsModel from "../database/models/TeamsModel";
import {
  MatchesListFilterFinished,
  MatchesListFilterInProgress,
  MatchesListWithoutFilter,
  createMatchBadRequest,
  createMatchBadRequestId,
  createMatchBody,
  createMatchResponse,
} from "./mock/match.mock";
import MatchesService from "../database/services/match.service";
import TokenGeneratorJwt from "../database/middlewares/tokenGeneratorJwt";

chai.use(chaiHttp);

const { expect } = chai;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4Njc2MzgzMn0.-_zGAqz107iPqjJkC4MzIX0GZDkCa3EVUkS43-IWzr8";

describe("Seu teste /matches", () => {
  let findAllStub: sinon.SinonStub<any, any>;
  let createStub: sinon.SinonStub<any, any>;
  let findManyByIdStub: sinon.SinonStub<any, any>;

  beforeEach(() => {
    sinon.restore();
  });

  it("Testando /matches create Match", async () => {
    sinon
      .stub(TokenGeneratorJwt.prototype, "verify")
      .returns({ email: "admin@admin.com", role: "admin" });
    createStub = sinon.stub(MatcheModel, "create");
    const match = MatcheModel.build(createMatchResponse);
    createStub.resolves(match);
    const response = await chai
      .request(app)
      .post("/matches")
      .set("Authorization", token)
      .send(createMatchBody);
    expect(response.status).to.be.eq(201);
    expect(response.body).to.deep.eq(createMatchResponse);
  });

  it("Testando /matches create Match with error times iguais", async () => {
    sinon
      .stub(TokenGeneratorJwt.prototype, "verify")
      .returns({ email: "admin@admin.com", role: "admin" });
    createStub = sinon.stub(MatcheModel, "create");
    findManyByIdStub = sinon.stub(TeamsModel, "findAll");

    createStub.resolves();
    findManyByIdStub.resolves();
    const response = await chai
      .request(app)
      .post("/matches")
      .set("Authorization", token)
      .send(createMatchBadRequest);

    expect(response.status).to.be.eq(422);
    expect(response.body).to.deep.eq({
      message: "It is not possible to create a match with two equal teams",
    });
  });

  it("Testando /matches create Match with error wrong id", async () => {
    sinon
      .stub(TokenGeneratorJwt.prototype, "verify")
      .returns({ email: "admin@admin.com", role: "admin" });
    createStub = sinon.stub(MatcheModel, "create");
    findManyByIdStub = sinon.stub(TeamsModel, "findOne");

    createStub.resolves();
    findManyByIdStub.resolves();
    const response = await chai
      .request(app)
      .post("/matches")
      .set("Authorization", token)
      .send(createMatchBadRequestId);

    expect(response.status).to.be.eq(404);
    expect(response.body).to.deep.eq({
      message: "There is no team with such id!",
    });
  });
});
