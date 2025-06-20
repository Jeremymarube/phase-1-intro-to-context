// Your code here
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}
function createTimeInEvent(employee, dateTime) {
  const [date, hourStr] = dateTime.split(' ');
  const hour = parseInt(hourStr, 10);

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: hour,
    date: date
  });

  return employee;
}
function createTimeOutEvent(employee, dateTime) {
  const [date, hourStr] = dateTime.split(' ');
  const hour = parseInt(hourStr, 10);

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: hour,
    date: date
  });

  return employee;
}
function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}
function wagesEarnedOnDate(employee, date) {
  const hours = hoursWorkedOnDate(employee, date);
  return hours * employee.payPerHour;
}
function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date);
  return dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
}
function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}
const empArr = ["John", "Doe", "Developer", 20]; // name, family name, title, pay rate
const employee = createEmployeeRecord(empArr);
console.log(employee);
createTimeInEvent(employee, "2023-06-20 0900");
createTimeOutEvent(employee, "2023-06-20 1700");

console.log(employee.timeInEvents);  // should show one timeIn event at 0900
console.log(employee.timeOutEvents); // should show one timeOut event at 1700
const hours = hoursWorkedOnDate(employee, "2023-06-20");
console.log(`Hours worked: ${hours}`);  // Expect 8
const wages = wagesEarnedOnDate(employee, "2023-06-20");
console.log(`Wages earned: $${wages}`); // Expect 8 * 20 = 160
// Add another day
createTimeInEvent(employee, "2023-06-21 1000");
createTimeOutEvent(employee, "2023-06-21 1800");

 console.log(allWagesFor(employee)); 
 
