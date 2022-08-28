import chalk from "chalk";
const log = console.log;

export function success(output: string) {
   log(chalk.green("✔ " + output));
}

export function deploy(output: string) {
   log(chalk.white("</> " + output));
}
