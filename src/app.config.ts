import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const { KEY, NODE_ENV, ORIGIN, HOST, PORT } = process.env;
