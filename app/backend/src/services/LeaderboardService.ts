import { IMatchStats, ILeaderboard } from '../interfaces/ILeaderboard';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import MatchService from './MatchService';
import TeamService from './TeamService';

type GoalsKey = 'homeTeamGoals' | 'awayTeamGoals';
type LeaderboardType = 'home' | 'away' | 'all';

const INITIAL_DATA_MATCH = {
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
};

class LeaderboardService {
  constructor(
    private _matchService = new MatchService(),
    private _teamService = new TeamService(),
  ) {}

  private sortLeaderboards = (a: ILeaderboard, b: ILeaderboard) => {
    let result = b.totalPoints - a.totalPoints;
    if (!result) result = b.totalVictories - a.totalVictories;
    if (!result) result = b.goalsBalance - a.goalsBalance;
    if (!result) result = b.goalsFavor - a.goalsFavor;
    if (!result) result = b.goalsOwn - a.goalsOwn;
    return result;
  };

  private getTeamScore = (match: IMatchStats) => {
    const { totalVictories, totalDraws, totalGames } = match;
    const totalPoints = (totalVictories * 3 + totalDraws * 1);
    const efficiency = (totalPoints / (totalGames * 3)) * 100;
    return { totalPoints, efficiency: Number(efficiency.toFixed(2)) };
  };

  private mergeDataMatches = (matches: IMatchStats[]) => {
    const MergedData = matches.reduce((acc, curr) => ({
      totalGames: acc.totalGames + curr.totalGames,
      totalVictories: acc.totalVictories + curr.totalVictories,
      totalDraws: acc.totalDraws + curr.totalDraws,
      totalLosses: acc.totalLosses + curr.totalLosses,
      goalsFavor: acc.goalsFavor + curr.goalsFavor,
      goalsOwn: acc.goalsOwn + curr.goalsOwn,
      goalsBalance: acc.goalsBalance + curr.goalsBalance,
    }), INITIAL_DATA_MATCH);
    return MergedData;
  };

  private getDataMatch = (match: Match, teamGoalsKey: GoalsKey, opponentGoalsKey: GoalsKey) => {
    const dataMatch = { ...INITIAL_DATA_MATCH };
    dataMatch.totalGames = 1;
    dataMatch.goalsFavor = match[teamGoalsKey];
    dataMatch.goalsOwn = match[opponentGoalsKey];
    dataMatch.goalsBalance = match[teamGoalsKey] - match[opponentGoalsKey];
    if (match[teamGoalsKey] > match[opponentGoalsKey]) {
      dataMatch.totalVictories = 1;
    } else if (match[teamGoalsKey] < match[opponentGoalsKey]) {
      dataMatch.totalLosses = 1;
    } else {
      dataMatch.totalDraws = 1;
    }
    return dataMatch;
  };

  private filterMatches = (teamId: number, allMatches: Match[]) => {
    const filteredHomeTeam = allMatches.filter(({ dataValues }) => dataValues.homeTeam === teamId);
    const filteredAwayTeam = allMatches.filter(({ dataValues }) => dataValues.awayTeam === teamId);
    return { homeTeam: filteredHomeTeam, awayTeam: filteredAwayTeam };
  };

  private awayTeamDataMatches = (id : number, allMatches: Match[]) => {
    const { awayTeam } = this.filterMatches(id, allMatches);
    const homeTeamData = awayTeam.map(
      (match) => this.getDataMatch(match, 'awayTeamGoals', 'homeTeamGoals'),
    );
    return homeTeamData;
  };

  private homeTeamDataMatches = (id : number, allMatches: Match[]) => {
    const { homeTeam } = this.filterMatches(id, allMatches);
    const homeTeamData = homeTeam.map(
      (match) => this.getDataMatch(match, 'homeTeamGoals', 'awayTeamGoals'),
    );
    return homeTeamData;
  };

  private allTeamsLeaderboard = (team: Team, allMatches: Match[]) => {
    const awayTeamsDataMatches = this.awayTeamDataMatches(team.id, allMatches);
    const homeTeamdataMatches = this.homeTeamDataMatches(team.id, allMatches);
    const mergedData = this.mergeDataMatches([
      ...awayTeamsDataMatches,
      ...homeTeamdataMatches,
    ]);
    const teamScore = this.getTeamScore(mergedData);
    return {
      name: team.teamName,
      ...mergedData,
      ...teamScore,
    };
  };

  private awayTeamsLeaderboard = (team: Team, allMatches: Match[]) => {
    const dataMatches = this.awayTeamDataMatches(team.id, allMatches);
    const mergedData = this.mergeDataMatches(dataMatches);
    const teamScore = this.getTeamScore(mergedData);
    return {
      name: team.teamName,
      ...mergedData,
      ...teamScore,
    };
  };

  private homeTeamsLeaderboard = (team: Team, allMatches: Match[]) => {
    const dataMatches = this.homeTeamDataMatches(team.id, allMatches);
    const mergedData = this.mergeDataMatches(dataMatches);
    const teamScore = this.getTeamScore(mergedData);
    return {
      name: team.teamName,
      ...mergedData,
      ...teamScore,
    };
  };

  public getLeaderboard = async (leaderboardType: LeaderboardType): Promise<ILeaderboard[]> => {
    const allMatches = await this._matchService.getByProgress(false);
    const allTeams = await this._teamService.getAll();
    const teamsLeaderboard = allTeams.map((team) => {
      if (leaderboardType === 'home') {
        return this.homeTeamsLeaderboard(team, allMatches);
      }
      if (leaderboardType === 'away') {
        return this.awayTeamsLeaderboard(team, allMatches);
      }
      return this.allTeamsLeaderboard(team, allMatches);
    });

    return teamsLeaderboard.sort(this.sortLeaderboards);
  };
}

export default LeaderboardService;
