// correct answer is 3337766

const fs = require('fs');

let fuel = 0;

calculator = value => {
  if (value) {
    const foo = Math.floor(parseInt(value) / 3) - 2;
    console.log(foo);
    fuel += foo;
  }
}

const calculate = (err, data) => {
  if (err) {
    console.log(err.message);
    process.exit();
  }
  console.log(data.split('\n').forEach(module => calculator(module)));
  console.log("total", fuel);
}

const result = fs.readFile('advent-01-input.txt', 'utf8', calculate);

