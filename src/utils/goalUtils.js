import moment from "moment";
import pluralize from "pluralize";

export function findGoalById(goalList, id){
    return goalList.find( item => item.id === id );
  }

export function compileNewGoal(data){
  const {title, description, lifetimeGoal, timeframeDigit, timeframePeriod} = data

  const timeframe = `${pluralize(timeframePeriod, Number(timeframeDigit), true)}`
  
  const newGoal = {
    title: title,
    description: description,
    timeframe: timeframe,
    // endDate: ,
    lTGoalsId: lifetimeGoal,
    eventsId: [],
  }
  // const fakeGoal = {
  //   ...newGoal,
  //   color:'teal',
  //   createdAt: Date.now(),
  //   id: Math.random().toString(36).substr(2, 9),
  // }
  return newGoal
}