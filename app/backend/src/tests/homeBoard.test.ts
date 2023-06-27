import { expect } from 'chai';
import HomeService from '../database/services/home.service';

describe('HomeService', () => {
  describe('homeBoard', () => {
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

      const homeService = new HomeService();
      homeService.teamName = async () => mockData.teams as any;
      homeService.teamsPoint = async () => mockData.teamsPoint;
      homeService.teamsVictory = async () => mockData.teamsVictory;
      homeService.teamsGoalsBalance = async () => mockData.teamsGoalsBalance;
      homeService.teamsGoalsFavor = async () => mockData.teamsGoalsFavor;
      homeService.teamsGoalsOwn = async () => mockData.teamsGoalsOwn;

      // Chame o método homeBoard
      const leaderboard = await homeService.homeBoard();

      // Verifique se o resultado está na ordem correta
      expect(leaderboard[0].name).to.equal('Time B');
      expect(leaderboard[1].name).to.equal('Time C');
      expect(leaderboard[2].name).to.equal('Time A');
    });
  });
});
