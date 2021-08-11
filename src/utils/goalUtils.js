// import moment from "moment";
import pluralize from "pluralize";
import moment,{diff} from 'moment'
import goalColors from './lTGoalColors.json'


// export function findGoalById(goalList, id){
//     return goalList.find( item => item.id === id );
//   }

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
  // goals.sort( (a,b) =>{
  //   return a.createdAt - b.createdAt
  // })

}
