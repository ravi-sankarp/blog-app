import * as jwt from "jsonwebtoken";
import config from "../config/config";

interface jwtPayload extends jwt.JwtPayload {
  id: string;
}

export default {
  generateJwtToken(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id },
        config.JWT_SECRET_KEY!,
        {
          expiresIn: config.JWT_EXPIRES_IN,
        },
        (err, token) => {
          if (err) {
            reject(err.message);
          }
          resolve(token!);
        }
      );
    });
  },
  verifyJwtToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.JWT_SECRET_KEY!, (err, decoded) => {
        if (err) {
          reject(err.message);
        }
        const { id } = decoded as jwtPayload;

        resolve(id);
      });
    });
  },
};
