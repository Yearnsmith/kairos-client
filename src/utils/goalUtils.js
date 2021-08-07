export function findGoalById(goalList, id){
    return goalList.find( item => item.id === id );
  }