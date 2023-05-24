import { Command } from "commander";


const program = new Command()

program.option('-d', 'Debug variable', false)
  .option('-p <port>', 'Server Port', 8080)
  .option('--mode <mode>', 'Work Environment', 'Development')
  .requiredOption('-user <user>', 'User using the application', 'User does not defined')
  .parse()

const options = program.opts()
  
console.log(options);
console.log(program.args);