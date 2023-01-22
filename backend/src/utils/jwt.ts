import * as jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface EmailJwtPayload extends jwt.JwtPayload {
    email: string;
  }
}
