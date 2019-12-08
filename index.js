const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString();
input = input.split(',');
input = input.map(n => Number(n));

const runIntcode = (intcode, noun, verb) => {
  let auxIntcode = [...intcode];
  auxIntcode[1] = noun;
  auxIntcode[2] = verb;

  for (let i = 0; i < auxIntcode.length; i = i + 4) {
    switch (auxIntcode[i]) {
      case 1:
        auxIntcode[auxIntcode[i + 3]] = auxIntcode[auxIntcode[i + 1]] + auxIntcode[auxIntcode[i + 2]];
        break;
      case 2:
        auxIntcode[auxIntcode[i + 3]] = auxIntcode[auxIntcode[i + 1]] * auxIntcode[auxIntcode[i + 2]];
        break;
      case 99:
        return auxIntcode[0];
      default:
        break;
    }
  }
  return auxIntcode[0];
};

const findNounVerb = intcode => {
  let noun = 0;
  let verb = 0;

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const auxRunIntcode = runIntcode(intcode, noun, verb);

      if (auxRunIntcode === 19690720) {
        return 100 * noun + verb;
      }
    }
  }

  return 100 * noun + verb;
};

console.log(runIntcode(input,12,2));
console.log(findNounVerb(input));
