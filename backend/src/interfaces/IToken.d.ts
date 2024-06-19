import { JwtPayload } from "jsonwebtoken";

export interface IToken extends JwtPayload {
  scopes: string[]
  sub: string
}