import ILeaderboard from '../../Interfaces/ILeaderBoard';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamsModel';

export default class HomeService {
  constructor(
    private matchModel: typeof MatchModel = MatchModel,
    private teamModel: typeof TeamModel = TeamModel,
  ) {}

  public async homeTeam(): Promise<MatchModel[]> {
    const matches = await this.matchModel.findAll({ where: { inProgress: false } });
    return matches;
  }

  public async awayTeam(): Promise<MatchModel[]> {
    const awayMatches = await this.matchModel.findAll({ where: { inProgress: false } });
    return awayMatches;
  }

  public async teamName(): Promise<TeamModel[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async totalMatches(): Promise<MatchModel[][]> {
    const matches = await this.homeTeam();
    const teams = await this.teamName();
    const teamMatches = teams.map((team) => {
      const filterTeams = matches.filter((match) => match.homeTeamId === team.id);
      return filterTeams;
    });
    return teamMatches;
  }

  public async totalMatchesAway(): Promise<MatchModel[][]> {
    const matches = await this.awayTeam();
    const teams = await this.teamName();
    const teamAwayMatches = teams.map((team) => {
      const filterTeams = matches.filter((match) => match.awayTeamId === team.id);
      return filterTeams;
    });
    return teamAwayMatches;
  }

  public async homeGamesByTeams(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const totalGames = homeGames.map((match) => match.length);
    return totalGames;
  }

  public async awayGamesByTeams(): Promise<number[]> {
    const awayGames = await this.totalMatchesAway();
    const totalAwayGames = awayGames.map((match) => match.length);
    return totalAwayGames;
  }

  public async teamsVictory(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const teamWins = homeGames.map((game) => {
      const victory = game.filter((goals) => goals.homeTeamGoals > goals.awayTeamGoals);
      return victory.length;
    });
    return teamWins;
  }

  public async teamsAwayVictory(): Promise<number[]> {
    const awayGames = await this.totalMatchesAway();
    const teamAwayWins = awayGames.map((game) => {
      const victory = game.filter((goals) => goals.awayTeamGoals > goals.homeTeamGoals);
      return victory.length;
    });
    return teamAwayWins;
  }

  public async teamsDraw(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const teamTies = homeGames.map((game) => {
      const draw = game.filter((goals) => goals.homeTeamGoals === goals.awayTeamGoals);
      return draw.length;
    });
    return teamTies;
  }

  public async teamsAwayDraw(): Promise<number[]> {
    const awayGames = await this.totalMatchesAway();
    const teamAwayTies = awayGames.map((game) => {
      const draw = game.filter((goals) => goals.awayTeamGoals === goals.homeTeamGoals);
      return draw.length;
    });
    return teamAwayTies;
  }

  public async teamsLoss(): Promise<number[]> {
    const homeGames = await this.totalMatches();
    const teamLosses = homeGames.map((game) => {
      const loss = game.filter((goals) => goals.homeTeamGoals < goals.awayTeamGoals);
      return loss.length;
    });
    return teamLosses;
  }

  public async teamsAwayLoss(): Promise<number[]> {
    const awayGames = await this.totalMatchesAway();
    const teamAwayLosses = awayGames.map((game) => {
      const loss = game.filter((goals) => goals.awayTeamGoals < goals.homeTeamGoals);
      return loss.length;
    });
    return teamAwayLosses;
  }

  public async teamsPoint(): Promise<number[]> {
    const victories = await this.teamsVictory();
    const draws = await this.teamsDraw();
    const teamPoints = victories.map((victory, index) => (victory * 3) + draws[index]);
    return teamPoints;
  }

  public async teamsAwayPoint(): Promise<number[]> {
    const victories = await this.teamsAwayVictory();
    const draws = await this.teamsDraw();
    const teamAwayPoints = victories.map((victory, index) => (victory * 3) + draws[index]);
    return teamAwayPoints;
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

  public async teamsAwayGoalsBalance(): Promise<number[]> {
    const goalsFavor = await this.teamsGoalsOwn();
    const goalsOwn = await this.teamsGoalsFavor();
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

  public async teamsAwayEfficiency(): Promise<string[]> {
    const teamPoints = await this.teamsAwayPoint();
    const games = await this.awayGamesByTeams();
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

  public async montageObjAwayTeam(): Promise<ILeaderboard[]> {
    const teams = await this.teamName();
    const awayLeaderboard = await Promise.all(
      teams.map(async (team, index) => ({
        name: team.teamName,
        totalPoints: (await this.teamsAwayPoint())[index],
        totalGames: (await this.awayGamesByTeams())[index],
        totalVictories: (await this.teamsAwayVictory())[index],
        totalDraws: (await this.teamsAwayDraw())[index],
        totalLosses: (await this.teamsAwayLoss())[index],
        goalsFavor: (await this.teamsGoalsOwn())[index],
        goalsOwn: (await this.teamsGoalsFavor())[index],
        goalsBalance: (await this.teamsAwayGoalsBalance())[index],
        efficiency: (await this.teamsAwayEfficiency())[index],
      })),
    );
    return awayLeaderboard;
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

  public async awayBoard(): Promise<ILeaderboard[]> {
    const toSortBoard = await this.montageObjAwayTeam();
    const awayBoard = toSortBoard.sort((x, y) => {
      if (y.totalPoints - x.totalPoints !== 0) return y.totalPoints - x.totalPoints;
      if (y.totalVictories - x.totalVictories !== 0) return y.totalVictories - x.totalVictories;
      if (y.goalsBalance - x.goalsBalance !== 0) return x.goalsBalance - y.goalsBalance;
      if (y.goalsFavor - x.goalsFavor !== 0) return y.goalsFavor - x.goalsFavor;
      if (y.goalsOwn - x.goalsOwn !== 0) return y.goalsOwn - x.goalsOwn;
      return y.totalPoints - x.totalPoints;
    });
    return awayBoard;
  }
}
