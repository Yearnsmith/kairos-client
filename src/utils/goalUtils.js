import { data } from '../services/data'

export function findGoalById(goalList, id){
    return goalList.find( item => item.id === parseInt(id) );
  }