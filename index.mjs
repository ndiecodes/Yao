import * as readline from "node:readline";
import Lexer from "./lexer/index.mjs";
import { EOF } from "./token.mjs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "YAO > ",
});

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();

  const lexer = new Lexer(input);

  for (
    let token = lexer.nextToken();
    token.type !== EOF;
    token = lexer.nextToken()
  ) {
    console.log(token);
  }
  rl.prompt();
});
