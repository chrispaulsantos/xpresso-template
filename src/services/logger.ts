import { Configuration, configure, getLogger } from 'log4js';
import * as context from 'express-http-context';

export type LogMessage = {
    date: string;
    logger: string;
    message?: string;
    method?: string;
    status?: number;
    url?: string;
    forwardedFor?: string;
    responseTime?: number;
    requestId?: string;
    error?: Error;
}

export class Logger {
    public static configure(config: Configuration) {
        configure(config);
    }

    public static getLogger(name?: string): Logger {
        return new this(name || 'default');
    }

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public log(level: string, message: Object): void {
        getLogger(this.name).log(level, this.formatMessage(message));
    }
    public fatal(message: Object): void {
        getLogger(this.name).fatal(this.formatMessage(message));
    }
    public error(message: Object): void {
        getLogger(this.name).error(this.formatMessage(message));
    }
    public warn(message: Object): void {
        getLogger(this.name).warn(this.formatMessage(message));
    }
    public info(message: Object): void {
        getLogger(this.name).info(this.formatMessage(message));
    }
    public debug(message: Object): void {
        getLogger(this.name).debug(this.formatMessage(message));
    }

    private formatMessage(message: Object): string {
        let date = new Date().toISOString();
        date = date.slice(0, date.length - 1);

        const logMessage: LogMessage = {
            message: this.parseMessage(message),
            logger: this.name,
            date
        };

        const id = context.get('id');
        if (id) {
            logMessage.requestId = id;
        }

        if (message instanceof Error) {
            logMessage.error = message;
        }

        return JSON.stringify(logMessage);
    }

    private parseMessage(message: Object): string {
        if (typeof message === 'string') {
            return message;
        } else if (typeof message === 'number') {
            return `${message}`;
        } else if (message instanceof Error) {
            return message.message;
        } else {
            return JSON.stringify(message);
        }
    }
}
