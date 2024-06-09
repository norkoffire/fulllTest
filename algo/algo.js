/*
Display numbers between 1 and N by following the rules:

    if number can be divided by 3: display Fizz ;
    if number can be divided by 5: display Buzz ;
    if number can be divided by 3 AND 5 : display FizzBuzz ;
    else: display the number.

*/
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

numbers.forEach((number) => {
  if (Number.isInteger(number / 5) && Number.isInteger(number / 3)) {
    console.log("FizzBuzz");
  } else if (Number.isInteger(number / 5)) {
    console.log("Buzz");
  } else if (Number.isInteger(number / 3)) {
    console.log("Fizz");
  } else console.log(number);
});
