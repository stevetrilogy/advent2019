const fs = require('fs');

let totalFuel = 0;

const calculate = value => Math.max(Math.floor(parseInt(value) / 3) - 2, 0);

const calculateTotalFuel = (err, data) => {
  if (err) {
    console.log(err.message);
    process.exit();
  }
  data.split('\n').forEach(module => {
    if (module) {
      let currentFuel = calculate(module);
      totalFuel += currentFuel;
      while (calculate(currentFuel) > 0) {
        currentFuel = calculate(currentFuel);
        totalFuel += currentFuel;
      }
    }
  });
  console.log("total", totalFuel);
}

fs.readFile('advent-01-input.txt', 'utf8', calculateTotalFuel);


