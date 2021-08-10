// import moment from "moment";
import pluralize from "pluralize";
import goalColors from './lTGoalColors.json'

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
  return newGoal
}

export function getGoalColor(category){
  const {career, physical, lifestyle, artistic, education} = goalColors;

  switch(category){
    case "career":
      return career
      break;
    case "physical":
      return physical
      break;
    case "lifestyle":
      return lifestyle
   
    case "artistic":
      return artistic

    case "education":
    case "educational":
      return education
    default:
      return "No such Long Term Goal goal"
  }

}