import { DataSource } from 'typeorm';

async function run() {
    const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'boilerplate_nestjs',
    });

    try {
        await dataSource.initialize();
        console.log('Connected to database. Dropping view...');
        await dataSource.query('DROP VIEW IF EXISTS uam_uar_view CASCADE;');
        console.log('View dropped successfully.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await dataSource.destroy();
    }
}

run();
