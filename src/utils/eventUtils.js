
// Parses urls to display in event card
// Credit to svestka https://stackoverflow.com/a/33018471
export function getURL(href) {
    let urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(href)
    return urlParts[1]+urlParts[2]
}



// Sets event repetition dropdown defaults
export const repeatOptions = [
    { key: 1, text: 'Daily', value: 1 },
    { key: 2, text: 'Weekly', value: 2 },
    { key: 3, text: 'Monthly', value: 3 },
  ]

//sets empty checklist values
export const defaultChecklist = {items: [], newItem: false, tempItem: ""}

//empty date object values
export const defaultDate = {
    eventDate: "",
    startTime: "",
    endTime: ""
    }
