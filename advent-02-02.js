const fs = require('fs');
const path = require('path');

const OK = 'OK';
const HALT = 'HALT';
const ERROR = 'ERROR';

let program = [];

// A quick hack is to grep out the answer. e.g.
// node advent-02-02 |grep 19690720

const main = (err, data) => {
  if (err) {
    console.log(err.message);
    process.exit();
  }

  const originalProgram = data.split(',');

  for (let noun = 0; noun < 100; noun++) {
    console.log(`outer loop is at ${noun}`);
    for (let verb = 0; verb < 100; verb++) {
      console.log(`inner loop is at ${verb}`);

      // Initilize state
      program = originalProgram.slice(0);
      program[1] = noun;
      program[2] = verb;
      
      let responseCode;
    
      for (i = 0; i < program.length; i += 4) {
        responseCode = runCommand(
          parseInt(program[i]),
          parseInt(program[i+1]),
          parseInt(program[i+2]),
          parseInt(program[i+3])
        );
        if (responseCode === ERROR) {
          console.log(`inputs (${noun}, ${verb}) caused an error`);
          process.exit();
        }
        if (responseCode === HALT) {
          console.log(`(${noun}, ${verb}): ${program[0]}`);
          break;
        }
      }
    }
  }
}

const runCommand = (opcode, loca, locb, locc) => {
//  console.log(`Running command with arguments ${opcode}, ${loca}, ${locb}, ${locc}`);
  switch(opcode) {
    case 99:
      return HALT;
    case 1:
      // add 
      program[locc] = parseInt(program[loca]) + parseInt(program[locb]);
      return OK;
    case 2:
      // multiply 
      program[locc] = parseInt(program[loca]) * parseInt(program[locb]);
      return OK;
    default:
      console.log(`unkown opcode ${opcode}`);
      return ERROR;
  }
};

const result = fs.readFile(path.join(__dirname, 'advent-02-input.txt'), 'utf8', main);
