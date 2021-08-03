import { data } from '../services/data'

export function findGoalById(goalList, id){
    return goalList.find( item => item.id === parseInt(id) );
  }

  export function unixTimeToLocale(time){
    const object =  new Date(time * 1000)
    const normalisedTime = object.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit' });
    return {
      time: normalisedTime,
      date: object.toLocaleDateString(),
      timeDate: `${normalisedTime}, ${object.toLocaleDateString()}.`
    }

  }