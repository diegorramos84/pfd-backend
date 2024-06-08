import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class DrizzleService {
  private db;
  constructor() {
    this.connect();
  }

  async connect(): Promise<void> {
    try {
      const pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      this.db = drizzle(pool);

      console.info(
        `Database connected: ${process.env.DB_DATABASE} | user: ${process.env.DB_USER}`,
      );
    } catch (error) {
      console.error('Database connection error');
      throw error;
    }
  }

  getDb() {
    return this.db;
  }
}
