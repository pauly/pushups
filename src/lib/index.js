const lib = module.exports = {}

// get the start of a calendar event
lib.eventStart = event => event && event.start && (event.start.dateTime || event.start.date)

// cheap and clumsy formatting of a date or date-time
lib.formatDate = date => {
  const lastPart = /^\d\d\d\d-\d\d-\d\d$/.test(date) ? 2 : 3
  return ('' + new Date(date)).split(' ').slice(1, lastPart).join(' ')
}
