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
    
    const rolesToAdd = ['business_reviewer', 'legal_reviewer', 'product_manager', 'business_owner', 'approver'];
    
    for (const role of rolesToAdd) {
      const checkQuery = `SELECT 1 FROM pg_type t 
                         JOIN pg_enum e ON t.oid = e.enumtypid 
                         WHERE t.typname = 'users_role_enum' AND e.enumlabel = '${role}';`;
      
      const res = await client.query(checkQuery);
      
      if (res.rows.length === 0) {
        console.log(`Menambahkan nilai '${role}' ke users_role_enum...`);
        // Note: ALTER TYPE ... ADD VALUE cannot be executed in a transaction, and that's fine here.
        await client.query(`ALTER TYPE users_role_enum ADD VALUE '${role}';`);
        console.log(`Berhasil menambahkan '${role}'!`);
      } else {
        console.log(`Nilai '${role}' sudah ada di database.`);
      }
    }
  } catch (err: any) {
    console.error('Error saat menjalankan query:', err.message);
  } finally {
    await client.end();
  }
}

fixEnum();
