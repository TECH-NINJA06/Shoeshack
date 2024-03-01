import dotenv from 'dotenv'

dotenv.config();

export const DB_NAME = 'E-commerce';
export const port = process.env.PORT || 5001;