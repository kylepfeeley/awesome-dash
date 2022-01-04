export function validateEmail(inputValue) {
  var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (regexEmail.test(inputValue)) {
    return true;
  }
  return;
}

export const truncate = (str: string) => {
  return str.length > 1 ? str.substring(0, 1) + '' : str;
};
