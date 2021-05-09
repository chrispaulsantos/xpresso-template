import app from './app';
import { connect } from './database';
import { Logger } from './services/logger';

// Initialize logger
Logger.configure({
    appenders: {
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: process.env.LOG_LEVEL || 'debug'
        }
    }
});

const LOGGER = Logger.getLogger();

connect(() => {
    const server = app.listen(process.env.PORT || 8080, () => {
        app.emit('APP_STARTED');
        LOGGER.info(`Application started: Port ${process.env.PORT || 8080}`);
    });

    app.on('APP_STOP', () => {
        server.close();
        process.exit(0);
    });
});
