interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

interface IMatch extends IScore{
  homeTeam: number,
  awayTeam: number,

}

export {
  IMatch,
  IScore,
};
