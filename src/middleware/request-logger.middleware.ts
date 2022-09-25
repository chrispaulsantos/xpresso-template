import { RequestHandler, Response } from 'express';
import * as morgan from 'morgan';
import { TokenIndexer } from 'morgan';
import { Request } from '../typings/request';

export const requestLogger = (): RequestHandler => {
    return morgan((tokens: TokenIndexer, req: Request, res: Response) => {
        // Add request date
        let date: string = tokens.date(req, res, 'iso');
        date = date.slice(0, date.length - 1);

        // Add url of request
        let url: string = tokens.url(req, res);
        const match: RegExpMatchArray | null = url.match(/([a-zA-Z0-9_\/]+)/);
        if (match !== null) {
            url = match[1];
        }
        
        const message = {
            date,
            method: tokens.method(req, res),
            status: parseInt(tokens.status(req, res), 10),
            url,
            forwardedFor: req.headers['x-forwarded-for'] ? `${req.headers['x-forwarded-for']} ` : '',
            responseTime: tokens['response-time'](req, res),
            requestId: req.id,
        };

        return JSON.stringify(message);
    });
};
