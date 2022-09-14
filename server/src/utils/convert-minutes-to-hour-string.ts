export function convertMinutesToHourString(hour: number) {
  const hours = Math.floor(hour / 60);
  const minutes = hour % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
