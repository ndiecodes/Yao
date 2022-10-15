import * as token from "../token.mjs";

export default class Lexer {
  constructor(input) {
    this.readPosition = 0;
    this.position = 0;
    this.input = input;
    this.ch = "";

    this.readChar();
  }
  nextToken() {
    let tok;
    this.skipWhiteSpace();
    switch (this.ch) {
      case "=":
        if (this.peek() === "=") {
          const ch = this.ch;
          this.readChar();
          const value = ch + this.ch;
          tok = this.newToken(token.EQ, value);
        } else {
          tok = this.newToken(token.ASSIGN, this.ch);
        }
        break;
      case "!":
        if (this.peek() === "=") {
          const ch = this.ch;
          this.readChar();
          const value = ch + this.ch;
          tok = this.newToken(token.NOT_EQ, value);
        } else {
          tok = this.newToken(token.BANG, this.ch);
        }
        break;
      case "-":
        tok = this.newToken(token.MINUS, this.ch);
        break;
      case "+":
        tok = this.newToken(token.PLUS, this.ch);
        break;
      case "/":
        tok = this.newToken(token.SLASH, this.ch);
        break;
      case "<":
        tok = this.newToken(token.LT, this.ch);
        break;
      case ">":
        tok = this.newToken(token.GT, this.ch);
        break;
      case "*":
        tok = this.newToken(token.ASTERISK, this.ch);
        break;
      case ";":
        tok = this.newToken(token.SEMICOLON, this.ch);
        break;
      case "(":
        tok = this.newToken(token.LPAREN, this.ch);
        break;
      case ")":
        tok = this.newToken(token.RPAREN, this.ch);
        break;
      case "{":
        tok = this.newToken(token.LBRACE, this.ch);
        break;
      case "}":
        tok = this.newToken(token.RBRACE, this.ch);
        break;
      case ",":
        tok = this.newToken(token.COMMA, this.ch);
        break;
      case 0:
        tok = this.newToken(token.EOF, "");
        break;
      default:
        if (this.isLetter(this.ch)) {
          const value = this.readIdentifier();
          const type = token.lookupIdentifier(value);
          tok = this.newToken(type, value);
          return tok;
        } else if (this.isNumber(this.ch)) {
          const value = this.readNumber();
          tok = this.newToken(token.INT, value);
          return tok;
        } else {
          tok = this.newToken(token.ILLEGAL, this.ch);
        }
        break;
    }
    this.readChar();
    return tok;
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = 0;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;

    this.readPosition++;
  }

  skipWhiteSpace() {
    while (
      typeof this.ch == "string" &&
      (this.ch.includes(" ") ||
        this.ch.includes("\r") ||
        this.ch.includes("\n") ||
        this.ch.includes("\t"))
    ) {
      this.readChar();
    }
  }

  readIdentifier() {
    let position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.substring(position, this.position);
  }

  readNumber() {
    let position = this.position;
    this.readChar();
    while (this.isNumber(this.ch)) {
      this.readChar();
    }

    return this.input.substring(position, this.position);
  }

  peek() {
    if (this.readPosition >= this.input.length) {
      return 0;
    }
    return this.input[this.readPosition];
  }

  isNumber(ch) {
    return !Number.isNaN(Number.parseInt(ch));
  }

  isLetter(ch) {
    if (typeof ch !== "string") {
      return false;
    }

    return ch.toLowerCase() !== ch.toUpperCase();
  }

  newToken(type, literal) {
    return new token.Token(type, literal);
  }
}
