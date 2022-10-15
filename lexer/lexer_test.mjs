import test from "node:test";
import assert from "node:assert";
import * as Token from "../token.mjs";
import Lexer from "./index.mjs";

test("test can tokinize operators input", (t) => {
  const input = `
  !-/*5;
  5 < 10 > 5;
  10 == 10;
  10 != 9;
  `;

  const expectedResults = [
    { type: Token.BANG, literal: "!" },
    { type: Token.MINUS, literal: "-" },
    { type: Token.SLASH, literal: "/" },
    { type: Token.ASTERISK, literal: "*" },
    { type: Token.INT, literal: "5" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.INT, literal: "5" },
    { type: Token.LT, literal: "<" },
    { type: Token.INT, literal: "10" },
    { type: Token.GT, literal: ">" },
    { type: Token.INT, literal: "5" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.INT, literal: "10" },
    { type: Token.EQ, literal: "==" },
    { type: Token.INT, literal: "10" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.INT, literal: "10" },
    { type: Token.NOT_EQ, literal: "!=" },
    { type: Token.INT, literal: "9" },
    { type: Token.SEMICOLON, literal: ";" },
  ];

  const lexer = new Lexer(input);

  for (let expected of expectedResults) {
    let got = lexer.nextToken();
    assert.deepEqual(got, expected);
  }
});

test("test assign statement", (t) => {
  const input = `let five = 5;
  let ten = 10;
  let add = func(x, y) {
    x + y;
  };
  let result = add(five, ten);
  if (5 < 10) {
      return true;
  } else {
      return false;
  }
  `;

  const expectedResults = [
    { type: Token.LET, literal: "let" },
    { type: Token.INDENTIFIER, literal: "five" },
    { type: Token.ASSIGN, literal: "=" },
    { type: Token.INT, literal: "5" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.LET, literal: "let" },
    { type: Token.INDENTIFIER, literal: "ten" },
    { type: Token.ASSIGN, literal: "=" },
    { type: Token.INT, literal: "10" },
    { type: Token.SEMICOLON, literal: ";" },
  ];

  const lexer = new Lexer(input);

  for (let expected of expectedResults) {
    let got = lexer.nextToken();
    assert.deepEqual(got, expected);
  }
});

test("test can tokenize function", (t) => {
  const input = `
    let add = func(x, y) {
      x + y;
    };
    let result = add(five, ten);
    `;

  const expectedResults = [
    { type: Token.LET, literal: "let" },
    { type: Token.INDENTIFIER, literal: "add" },
    { type: Token.ASSIGN, literal: "=" },
    { type: Token.FUNCTION, literal: "func" },
    { type: Token.LPAREN, literal: "(" },
    { type: Token.INDENTIFIER, literal: "x" },
    { type: Token.COMMA, literal: "," },
    { type: Token.INDENTIFIER, literal: "y" },
    { type: Token.RPAREN, literal: ")" },
    { type: Token.LBRACE, literal: "{" },
    { type: Token.INDENTIFIER, literal: "x" },
    { type: Token.PLUS, literal: "+" },
    { type: Token.INDENTIFIER, literal: "y" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.RBRACE, literal: "}" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.LET, literal: "let" },
    { type: Token.INDENTIFIER, literal: "result" },
    { type: Token.ASSIGN, literal: "=" },
    { type: Token.INDENTIFIER, literal: "add" },
    { type: Token.LPAREN, literal: "(" },
    { type: Token.INDENTIFIER, literal: "five" },
    { type: Token.COMMA, literal: "," },
    { type: Token.INDENTIFIER, literal: "ten" },
    { type: Token.RPAREN, literal: ")" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.EOF, literal: "" },
  ];

  const lexer = new Lexer(input);

  for (let expected of expectedResults) {
    let got = lexer.nextToken();
    assert.deepEqual(got, expected);
  }
});

test("test condition flow", (t) => {
  const input = `
    if (5 < 10) {
        return true;
    } else {
        return false;
    }
    `;

  const expectedResults = [
    { type: Token.IF, literal: "if" },
    { type: Token.LPAREN, literal: "(" },
    { type: Token.INT, literal: "5" },
    { type: Token.LT, literal: "<" },
    { type: Token.INT, literal: "10" },
    { type: Token.RPAREN, literal: ")" },
    { type: Token.LBRACE, literal: "{" },
    { type: Token.RETURN, literal: "return" },
    { type: Token.TRUE, literal: "true" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.RBRACE, literal: "}" },
    { type: Token.ELSE, literal: "else" },
    { type: Token.LBRACE, literal: "{" },
    { type: Token.RETURN, literal: "return" },
    { type: Token.FALSE, literal: "false" },
    { type: Token.SEMICOLON, literal: ";" },
    { type: Token.RBRACE, literal: "}" },
    { type: Token.EOF, literal: "" },
  ];

  const lexer = new Lexer(input);

  for (let expected of expectedResults) {
    let got = lexer.nextToken();
    assert.deepEqual(got, expected);
  }
});
