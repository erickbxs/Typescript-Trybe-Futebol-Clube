const createMatchBody = {
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 1,
    awayTeamGoals: 4,
    inProgress: true,
  };
  
  const createMatchBadRequest = {
    homeTeamId: 1,
    awayTeamId: 1,
    homeTeamGoals: 1,
    awayTeamGoals: 4,
    inProgress: true,
  };
  
  const createMatchBadRequestId = {
    homeTeamId:400,
    awayTeamId: 1,
    homeTeamGoals: 1,
    awayTeamGoals: 4,
    inProgress: true,
  };
  
  const createMatchResponse = {
    id: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    homeTeamGoals: 1,
    awayTeamGoals: 4,
    inProgress: true,
  };
  
  const MatchesListWithoutFilter = [
    {
      id: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 4,
      inProgress: true,
    },
    {
      id: 2,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 4,
      inProgress: true,
    },
  ];
  
  const MatchesListFilterInProgress = [
    {
      id: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 4,
      inProgress: true,
    },
    {
      id: 2,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 4,
      inProgress: true,
    },
  ];
  
  const MatchesListFilterFinished = [
    {
      id: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 4,
      inProgress: false,
    },
    {
      id: 2,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 1,
      awayTeamGoals: 4,
      inProgress: false,
    },
  ];
  
  export {
    createMatchBody,
    createMatchResponse,
    MatchesListWithoutFilter,
    MatchesListFilterInProgress,
    MatchesListFilterFinished,
    createMatchBadRequestId,
    createMatchBadRequest
  }