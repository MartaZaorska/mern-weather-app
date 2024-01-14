export function validateEmail(email){
  return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? true : false;
}

export function validateUserData(email, password, username){
  const result = {};

  if(typeof username === "string" && !username) result.username = "Nieprawidłowa nazwa użytkownika";
  if(!email || !validateEmail(email)) result.email = "Nieprawidłowy adres email";
  if(typeof password === "string" && (!password || password.length < 8)) result.password = "Twoje hasło jest za krótkie (minimum 8 znaków)";

  return result;
}

export function formatDate(datetime, timezoneOffset){
  const date = new Date(datetime * 1000 + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
  return {
    day: DAYS[date.getDay()],
    text: `${`${date.getDate()}`.padStart(2, "0")}.${`${date.getMonth() + 1}`.padStart(2, "0")}.${date.getFullYear()}`
  };
}