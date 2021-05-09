import { NextFunction, RequestHandler, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Request } from '../typings';
const context = require('express-cls-hooked');

export function generateRequestId(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
        req.id = uuid();
        context.set('id', req.id);
        next();
    };
}
