export class Token {
  constructor(type = null, literal = null) {
    this.type = type;
    this.literal = literal;
  }
}

export const ILLEGAL = "ILLEGAL";
export const EOF = "EOF";

export const INDENTIFIER = "INDENTIFIER";

// literals
export const INT = "INT";

// Operators
export const PLUS = "+";
export const MINUS = "-";
export const ASSIGN = "=";
export const ASTERISK = "*";
export const BANG = "!";
export const NOT_EQ = "!=";
export const EQ = "==";
export const SLASH = "/";
export const GT = ">";
export const LT = "<";

//delimiters
export const COMMA = ",";
export const SEMICOLON = ";";
export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";

//keywords
export const LET = "LET";
export const FUNCTION = "FUNCTION";
export const IF = "IF";
export const ELSE = "ELSE";
export const RETURN = "RETURN";
export const TRUE = "TRUE";
export const FALSE = "FALSE";

const keywords = {
  func: FUNCTION,
  let: LET,
  if: IF,
  else: ELSE,
  return: RETURN,
  true: TRUE,
  false: FALSE,
};

export function lookupIdentifier(ident) {
  if (keywords.hasOwnProperty(ident)) {
    return keywords[ident];
  }
  return INDENTIFIER;
}
