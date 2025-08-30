export const currentDate = (): string => {
  const months: string[] = [
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

  const day: number = new Date().getDate();
  const month: string = months[new Date().getMonth()];
  const hours: number = new Date().getHours();
  const minutes: number = new Date().getMinutes();

  const h: string = hours <= 9 ? `0${hours}` : `${hours}`;
  const m: string = minutes <= 9 ? `0${minutes}` : `${minutes}`;

  return `${day} ${month}, ${h}:${m}`;
};
