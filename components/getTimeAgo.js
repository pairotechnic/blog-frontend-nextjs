import moment from 'moment'

export const getTimeAgo = (datetime) => {

  let postedTime = moment(datetime)
  // postedTime.add({ hours: 5, minutes: 30, seconds: 0})
  return postedTime.fromNow()
  
}