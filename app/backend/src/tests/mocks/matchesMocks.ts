const allMatchesMock = [
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
]

const validMatchPostMock = {
  "homeTeam": 1,
  "awayTeam": 2,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const invalidMatchPostMock = {
  "homeTeam": 1,
  "awayTeam": 1,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const invalidTeamOnReqMock = {
  "homeTeam": 100,
  "awayTeam": 1,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const newMatchMock = {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 2,
    "awayTeamGoals": 2,
    "inProgress": true,
}

const updateMatchMock = {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}

const progressTrueMatchMock = {
    "id": 2,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
}

const progressFalseMatchMock = {
    "id": 2,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
}

export {
  allMatchesMock,
  validMatchPostMock,
  newMatchMock,
  invalidMatchPostMock,
  invalidTeamOnReqMock,
  progressFalseMatchMock,
  progressTrueMatchMock,
  updateMatchMock,
}
