function truncate(str, maxlength) {
  const dots = "…";

  if (str.length <= maxlength) {
    return str;
  } else {
    let newStr = str.slice(0, maxlength - dots.length) + "…";

    return newStr;
  }
}
