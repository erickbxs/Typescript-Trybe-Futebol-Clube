import { expect } from 'chai';
import AwayService from '../database/services/away.service';

describe('AwayService', () => {
  describe('awayBoard', () => {
    it('Deve retornar o leaderboard de times em ordem decrescente de pontos, vitórias, saldo de gols, gols favor e gols contra', async () => {

      const mockData = {
        teams: [
          { teamName: 'Time A' },
          { teamName: 'Time B' },
          { teamName: 'Time C' },
        ],
        teamsPoint: [9, 12, 9],
        teamsVictory: [3, 4, 3],
        teamsGoalsBalance: [5, 8, 4],
        teamsGoalsFavor: [15, 18, 12],
        teamsGoalsOwn: [10, 10, 8],
      };

      const awayService = new AwayService();
      awayService.teamName = async () => mockData.teams as any;
      awayService.teamsPoint = async () => mockData.teamsPoint;
      awayService.teamsVictory = async () => mockData.teamsVictory;
      awayService.teamsGoalsBalance = async () => mockData.teamsGoalsBalance;
      awayService.teamsGoalsFavor = async () => mockData.teamsGoalsFavor;
      awayService.teamsGoalsOwn = async () => mockData.teamsGoalsOwn;

      // Chame o método awayBoard
      const leaderboard = await awayService.awayBoard();

      // Verifique se o resultado está na ordem correta
      expect(leaderboard[0].name).to.equal('Time B');
      expect(leaderboard[1].name).to.equal('Time C');
      expect(leaderboard[2].name).to.equal('Time A');
    });
  });
});
