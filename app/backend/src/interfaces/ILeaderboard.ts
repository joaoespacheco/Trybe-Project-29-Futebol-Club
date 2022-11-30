interface IMatchStats {
  totalGames:number,
  totalVictories:number,
  totalDraws:number,
  totalLosses:number,
  goalsFavor:number,
  goalsOwn:number,
  goalsBalance:number,
}

interface ITeamScore {
  totalPoints: number,
  efficiency: number
}

interface ILeaderboard extends IMatchStats, ITeamScore {
  name: string,
}

export {
  IMatchStats,
  ILeaderboard,
};
