import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function fixEnum() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'boilerplate_nestjs',
  });

  try {
    await client.connect();
    console.log('Terhubung ke database...');
    
    // Query untuk mengecek apakah nilai 'technical_reviewer' sudah ada di enum
    const checkQuery = `SELECT target.enumlabel FROM pg_type type 
                       JOIN pg_enum target ON type.oid = target.enumtypid 
                       WHERE type.typname = 'users_role_enum' AND target.enumlabel = 'technical_reviewer';`;
    
    const res = await client.query(checkQuery);
    
    if (res.rows.length === 0) {
      console.log("Menambahkan nilai 'technical_reviewer' ke users_role_enum...");
      await client.query("ALTER TYPE users_role_enum ADD VALUE 'technical_reviewer';");
      console.log('Berhasil diperbarui!');
    } else {
      console.log("Nilai 'technical_reviewer' sudah ada di database.");
    }
  } catch (err: any) {
    console.error('Error saat menjalankan query:', err.message);
  } finally {
    await client.end();
  }
}

fixEnum();
