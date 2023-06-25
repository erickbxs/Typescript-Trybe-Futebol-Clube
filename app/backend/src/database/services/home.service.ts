import ILeaderboard from '../../Interfaces/ILeaderBoard';
import Match from '../models/MatchModel';
import Team from '../models/TeamsModel';

export default class HomeService {
  constructor(private matchModel: typeof Match = Match, private teamModel: typeof Team = Team) {}

  public async homeTeam(): Promise<Match[]> {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    return matches;
  }

  public async teamName(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async totalMatches(): Promise<Match[][]> {
    const matches = await this.homeTeam();
    const teams = await this.teamName();
    const teamMatches = teams.map((team) => {
      const filterTeams = matches.filter((match) => match.homeTeamId === team.id);
      return filterTeams;
    });
    return teamMatches;
  }

  public async homeGamesByTeams(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const totalGames = homeGames.map((match) => match.length);
    return totalGames;
  }

  public async teamsVictory(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const teamWins = homeGames.map((game) => {
      const victory = game.filter((goals) => goals.homeTeamGoals > goals.awayTeamGoals);
      return victory.length;
    });
    return teamWins;
  }

  public async teamsDraw(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const teamTies = homeGames.map((game) => {
      const draw = game.filter((goals) => goals.homeTeamGoals === goals.awayTeamGoals);
      return draw.length;
    });
    return teamTies;
  }

  public async teamsLoss(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const teamLosses = homeGames.map((game) => {
      const loss = game.filter((goals) => goals.homeTeamGoals < goals.awayTeamGoals);
      return loss.length;
    });
    return teamLosses;
  }

  public async teamsPoint(): Promise<number[]> {
    const victories = await this.teamsVictory();
    const draws = await this.teamsDraw();
    const teamPoints = victories.map((victory, index) => (victory * 3) + draws[index]);
    return teamPoints;
  }

  public async teamsGoalsFavor(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const goalsFavor = homeGames.map((game) => {
      const homeTeamGoals = game.map((goals) => goals.homeTeamGoals);
      const allGoals = homeTeamGoals.reduce((acc, curr) => acc + curr, 0);
      return allGoals;
    });
    return goalsFavor;
  }

  public async teamsGoalsOwn(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const goalsOwn = homeGames.map((game) => {
      const awayTeamGoals = game.map((goals) => goals.awayTeamGoals);
      const allGoals = awayTeamGoals.reduce((acc, curr) => acc + curr, 0);
      return allGoals;
    });
    return goalsOwn;
  }

  public async teamsGoalsBalance(): Promise<number[]> {
    const goalsFavor = await this.teamsGoalsFavor();
    const goalsOwn = await this.teamsGoalsOwn();
    const goalsBalance = goalsFavor.map((goal, index) => goal - goalsOwn[index]);
    return goalsBalance;
  }

  public async teamsEfficiency(): Promise<string[]> {
    const teamPoints = await this.teamsPoint();
    const games = await this.homeGamesByTeams();
    const efficiency = teamPoints.map((points, index) =>
      (points / ((games[index] * 3) / 100)).toFixed(2));
    return efficiency;
  }

  public async montageObjTeam(): Promise<ILeaderboard[]> {
    const teams = await this.teamName();
    const homeLeaderboard = await Promise.all(
      teams.map(async (team, index) => ({
        name: team.teamName,
        totalPoints: (await this.teamsPoint())[index],
        totalGames: (await this.homeGamesByTeams())[index],
        totalVictories: (await this.teamsVictory())[index],
        totalDraws: (await this.teamsDraw())[index],
        totalLosses: (await this.teamsLoss())[index],
        goalsFavor: (await this.teamsGoalsFavor())[index],
        goalsOwn: (await this.teamsGoalsOwn())[index],
        goalsBalance: (await this.teamsGoalsBalance())[index],
        efficiency: (await this.teamsEfficiency())[index],
      })),
    );
    return homeLeaderboard;
  }

  public async homeBoard(): Promise<ILeaderboard[]> {
    const toSortBoard = await this.montageObjTeam();
    const homeBoard = toSortBoard.sort((a, b) => {
      if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
      if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor - a.goalsFavor !== 0) return b.goalsFavor - a.goalsFavor;
      if (b.goalsOwn - a.goalsOwn !== 0) return b.goalsOwn - a.goalsOwn;
      return b.totalPoints - a.totalPoints;
    });
    return homeBoard;
  }
}
