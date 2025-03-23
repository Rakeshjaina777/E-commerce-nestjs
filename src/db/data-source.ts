import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { UserEntity } from '../users/entities/user.entity'; // Import entity manually


// Load environment variables
config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'your_new_password',
  database: process.env.DB_NAME || 'bazarapi',
  synchronize: false, // Set to false in production
  logging: false,
  entities: [UserEntity],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],

  subscribers: [],
};

// ✅ Create a DataSource instance for database initialization & migrations
export const AppDataSource = new DataSource(dataSourceOptions);
