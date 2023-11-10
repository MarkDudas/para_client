export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = Array.from(
  { length: new Date().getFullYear() - 1950 + 1 },
  (_, index) => 1950 + index
);

export const formatSalary = (salary: number) => {
  if (salary % 1000 === 0) {
    return `₱ ${salary.toLocaleString()}`;
  } else {
    return `₱ ${salary}`;
  }
};
