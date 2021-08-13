import pluralize from "pluralize";
import moment from 'moment'
import goalColors from './lTGoalColors.json'

// take gaol data from goal form and compile it into an API friendly format.
export function compileNewGoal(data){
  const {title, description, lifetimeGoal, timeframeDigit, timeframePeriod} = data
  
  // uses pluralize library to mhandle 'month' in dropdown and convert it to 'months'
  // if the number is greater than 1. The library can also prepends the number to front of the string
  // TODO: take swtich from API that converts timeframePeriod into endDate, and add it here.  
  const timeframe = `${pluralize(timeframePeriod, Number(timeframeDigit), true)}`
  
  const newGoal = {
    title: title,
    description: description,
    timeframe: timeframe,
    lTGoalsId: lifetimeGoal,
    eventsId: [],
  }
  return newGoal
}

// take goal data from goal form and update an existing goal. 
export function compileExistingGoal(goalData, formData){

  // As above for the time period.
  formData.timeframe = `${pluralize(formData.timeframePeriod, Number(formData.timeframeDigit), true)}`
  // remove thes from the data being sent through to API to avoid errors.
  delete formData.timeframeDigit
  delete formData.timeframePeriod
  delete goalData.lTGoalsId
  // put the id back into the array 
  // (an array is used on API for futureproofing. We were toying with addind goals to multiple lifetime goals )
  goalData.lTGoalsId = [formData.lifetimeGoal]
  delete formData.lifetimeGoal

// assign these objects together. We could also use spread operators to make it modern JS I suppose.
  return Object.assign(goalData, formData)

}

export function extractGoalData(goalObject){

  const splitTimeFrame = goalObject.timeframe.split(" ")
  const timeframeDigit = parseInt(splitTimeFrame[0])
  const timeframePeriod = pluralize(splitTimeFrame[1], 1, false)
  
  return {
      title: goalObject.title,
      description: goalObject.description,
      lifetimeGoal: goalObject.lTGoalsId[0].id,
      timeframeDigit: timeframeDigit,
      timeframePeriod: timeframePeriod
  }

}

export function getGoalColor(category){
  const {career, physical, lifestyle, artistic, education} = goalColors;

  switch(category){
    case "career":
      return career

    case "physical":
      return physical
      
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
// extract to sortReducer???
export function sortGoals(goals, action){
  const sortBy = (property) => goals.sort((a,b) => {
    
    let propA = property !== 'lTGoalsId' ? a[property].toLowerCase() : a[property][0].type
    let propB = property !== 'lTGoalsId' ? b[property].toLowerCase() : b[property][0].type
      if(propA < propB){
        return -1;
      }
      if (propA > propB){
        return 1;
      }
      return 0
  })

  const sortByDate = property => goals.sort((a,b)=> moment(a[property]).diff(b[property]) )
  switch(action){
    case 'dateCreated':
      return sortByDate('createdAt')

    case 'dateDue':
      return sortByDate('endDate')
    case 'LTG':
    return sortBy('lTGoalsId')

    case 'dateCompleted':
      return sortByDate('completedAt')

    case 'title':
      return sortBy('title')
    default:
      return 'no such sort action'
  
  }

}
