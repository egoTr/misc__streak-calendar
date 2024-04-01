/**
 * Show Streak calendar for the specified year and month
 * A week starts on Sunday and ends on Saturday
 */

// todo: editable
const CONST__STREAKED_SYMBOL = '✔'; // 🗣️✔🐉

//#region Other months ---------------------------------------------------------- START 
// todo: past months
const CONST_PAST_MONTHS = [
  { year: 2024, month: 3, display: 'MAR', days_in_month: 31, days_streaked: 31 }
].forEach(month => {
  const el = document.createElement('p');
  el.classList.add('past');
  el.textContent = month.display;

  other_months.appendChild(el);
});

// todo: this month w/ progress
const el = document.createElement('p');
el.classList.add('this');
el.textContent = 1;
other_months.appendChild(el);

// todo: next months
const CONST_NEXT_MONTHS = [
  { year: 2024, month: 5, display: 'MAY', days_in_month: 31 },
  { year: 2024, month: 6, display: 'JUN', days_in_month: 30 },
  { year: 2024, month: 7, display: 'JUL', days_in_month: 31 },
].forEach(month => {
  const el = document.createElement('p');
  el.classList.add('next');
  el.textContent = month.display;

  other_months.appendChild(el);
});
//#endregion Other months ------------------------------------------------------- END 

const btn = document.getElementById('btn');
const yearInput = document.getElementById('year');
const monthInput = document.getElementById('month');

// Set initial values for year and month as current year and month
const currentDate = new Date();
yearInput.value = currentDate.getFullYear();
monthInput.value = currentDate.getMonth() + 1;
btn.addEventListener('click', generateCalendar);

window.onload = generateCalendar();

function generateCalendar() {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  // Get the year and month values from the inputs
  const year = parseInt(yearInput.value);
  const month = parseInt(monthInput.value);

  // Create a new Date object for the specified year and month
  const date = new Date(year, month - 1, 1);

  // Get the number of days in the month
  const daysInMonth = new Date(year, month, 0).getDate();

  // Get the day of the week for the first day of the month (0 - Sunday, 1 - Monday, etc.)
  const firstDayOfWeek = date.getDay();

  const table = document.querySelector('table');
  table.innerHTML = '';

  // Create the table header row
  const headerRow = document.createElement('tr');

  // Create the day of the week headers starting from Monday
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < daysOfWeek.length; i++) {
    const th = document.createElement('th');
    th.textContent = daysOfWeek[i].substring(0, 2);
    headerRow.appendChild(th);
  }

  // Append the header row to the table
  table.appendChild(headerRow);

  // Create the table rows for the days of the month
  let dayInMonth = 1;
  let dayPrev = 1;

  // Maximum of 6 weeks
  for (let week = 0; week < 6; week++) {
    const row = document.createElement('tr');

    for (let weekDay = 0; weekDay < 7; weekDay++) {
      const cell = document.createElement('td');
      // todo
      const validDay = weekDay >= firstDayOfWeek;

      const isToday = dayInMonth === todayDate && month === todayMonth && year === todayYear;
      // Apply styles to the specific days of the month
      if (isToday && validDay)
        cell.classList.add('today');

      // Add the day number to the cell
      if (week === 0 && !validDay) {
        cell.textContent = '';
      } else if (dayInMonth > daysInMonth) {
        break;
      } else {
        // Highlight passed days
        // todo
        if (+dayInMonth > 0 && +dayInMonth <= todayDate)
          cell.classList.add('passed');

        // Continuous days
        // todo
        if (
          dayInMonth > 1 &&       // not 1st
          weekDay >= 1 &&         // Mon-Sat
          dayInMonth <= todayDate // Before or today
        )
          cell.classList.add('continuous');

        // todo
        cell.textContent =
          dayInMonth <= daysInMonth && dayInMonth >= todayDate ?
            dayInMonth :
            CONST__STREAKED_SYMBOL;

        dayPrev = dayInMonth;

        dayInMonth++;
      }

      // Append the cell to the row
      row.appendChild(cell);
    }

    // Append the row to the table
    table.appendChild(row);
  }

  // Append the table to the calendar container
  calendar.appendChild(table);
}