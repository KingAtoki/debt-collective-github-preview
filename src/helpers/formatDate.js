export const formatDate = date => {
  const dateObj = new Date(date)
  const dateOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
  return dateObj.toLocaleDateString(undefined, dateOptions)
}
