import { IToken } from "../interfaces/IToken.js";

declare global {
  namespace Express {
    interface Request {
      token: IToken
    }
  }
}
