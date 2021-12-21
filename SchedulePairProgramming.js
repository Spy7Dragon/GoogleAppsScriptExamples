TIMESTAMP_COLUMN = 0;
MONDAY = 1;
TUESDAY = 2;
WEDNESDAY = 3;
THURSDAY = 4;
EMAIL_COLUMN = 5;
SENT_COLUMN = 6;

HEADER_ROW = 0;

RECEIVER_EMAIL = 'branden.huggins@collins.com';

function schedulePairProgramming() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = HEADER_ROW + 1; i < data.length; i++)
  {
    var row = data[i];
    var sent_status = row[SENT_COLUMN];
    if (!sent_status)
    {
      var monday_times = row[MONDAY].split(',');
      var tuesday_times = row[TUESDAY].split(',');
      var wednesday_times = row[WEDNESDAY].split(',');
      var thursday_times = row[THURSDAY].split(',');
      var sender_email = row[EMAIL_COLUMN];
      
      sendEvents(MONDAY, monday_times, sender_email);
      sendEvents(TUESDAY, tuesday_times, sender_email);
      sendEvents(WEDNESDAY, wednesday_times, sender_email);
      sendEvents(THURSDAY, thursday_times, sender_email);

      var sent_cell = sheet.getRange(i + 1, SENT_COLUMN + 1);
      sent_cell.setValue(true);
      SpreadsheetApp.flush();
    }
  }
}

function sendEvents(day, times, senderEmail)
{
  var date = getDate(day);
  if (times[0] !== '')
  {
    var event_times = createEventTimes(date, times)
    createEvents(event_times, senderEmail);
  }
}

function getDate(day)
{
  var current = new Date();
  current.setHours(0, 0, 0, 0);
  var sunday_day = current.getDate() - current.getDay();
  var selected_day = sunday_day + day;
  var selected_date = new Date(current.setDate(selected_day));
  return selected_date;
}

var DESC_TO_HOUR_MAP = {
  '2 p.m.': 14,
  '3 p.m.': 15,
  '4 p.m.': 16,
  '5 p.m.': 17
}

function createEventTimes(date, times)
{
  var dates = []
  for (var key in times)
  {
    var time = times[key].trim();
    var hours_to_add = DESC_TO_HOUR_MAP[time];
    var date_and_time = new Date(date);
    date_and_time.setHours(hours_to_add);
    dates.push(date_and_time);
  }
  return dates;
}

function createEvents(eventTimes, senderEmail)
{
  for (var key in eventTimes)
  {
    var eventTime = eventTimes[key];
    var endTime = new Date(eventTime);
    endTime.setHours(endTime.getHours() + 1);
    var guests = [RECEIVER_EMAIL, senderEmail].join(',');
    var event = CalendarApp.getDefaultCalendar()
    .createEvent('Pair-Programming', eventTime, endTime, {
      location: 'lab',
      sendInvites: true,
      guests: guests
    });
  }
}
