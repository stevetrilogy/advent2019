const fs = require('fs');

let program = [];

const main = (err, data) => {
  if (err) {
    console.log(err.message);
    process.exit();
  }
  program = data.split(',');

  // Initilize state
  program[1] = 12;
  program[2] = 2;

  for (i = 0; i < program.length; i += 4) {
    runCommand(
      parseInt(program[i]),
      parseInt(program[i+1]),
      parseInt(program[i+2]),
      parseInt(program[i+3])
    );
  }
}

const runCommand = (opcode, loca, locb, locc) => {
  switch(opcode) {
    case 99:
      console.log(program.join(','));
      process.exit();
    case 1:
      // add 
      program[locc] = parseInt(program[loca]) + parseInt(program[locb]);
      break;
    case 2:
      // multiply 
      program[locc] = parseInt(program[loca]) * parseInt(program[locb]);
      break;
    default:
      console.log(`unkown opcode ${opcode}`);
      break;
  }
};

const result = fs.readFile('advent-02-input.txt', 'utf8', main);
