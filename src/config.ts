const config = {
    jwt: {
        secret: '{{JWT_SECRET}}' 
    },
    database: {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        name: process.env.POSTGRES_DB,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD
    },
    cors: {
        origins: 'http://localhost:3000' 
    }
};

export default config;
