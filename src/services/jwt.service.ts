import * as jwt from 'jsonwebtoken';
import { JWTPayload } from '../models/jwt-payload';
import { Logger } from '../services/logger';
import config from '../config';

const LOGGER = Logger.getLogger('JWTService');

export class JWTService {
    public static generateToken(payload: JWTPayload): string {
        return jwt.sign(payload, config.jwt.secret, {
            expiresIn: 60 * 60 * 24
        });
    }

    public static verify(token: string): JWTPayload {
        let decoded: JWTPayload;

        try {
            decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;
        } catch (e) {
            LOGGER.error(e);
            throw e;
        }

        return decoded;
    }
}
