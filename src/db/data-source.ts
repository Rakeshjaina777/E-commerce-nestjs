import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
  import { join } from 'path';

// Load environment variables
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'your_new_password',
  database: process.env.DB_NAME || 'bazarapi',
  synchronize: true, // Set to false in production
  logging: false,
entities: [join(__dirname, '**', '*.entity.js')],  
migrations: [join(__dirname, 'db', 'migrations', '*.js')],

  subscribers: [],
};

// ✅ Create a DataSource instance for database initialization & migrations
export const AppDataSource = new DataSource(dataSourceOptions);
