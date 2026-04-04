import { DataSource } from 'typeorm';
import Constant from '../common/constant';
import { MasterBusinessUnit } from '../entities/master-business-unit.entity';
import { MasterProductCategory } from '../entities/master-product-category.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: Constant.DB_HOST,
    port: Constant.DB_PORT,
    username: Constant.DB_USER,
    password: Constant.DB_PASSWORD,
    database: Constant.DB_NAME,
    entities: [
      MasterBusinessUnit,
      MasterProductCategory,
    ],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection initialized');

    const buRepo = dataSource.getRepository(MasterBusinessUnit);
    const catRepo = dataSource.getRepository(MasterProductCategory);

    // Seed Business Units
    const businessUnits = [
      { code: 'BU-DIGITAL', name: 'Digital Services', description: 'Unit bisnis layanan perbankan digital' },
      { code: 'BU-RETAIL', name: 'Retail Banking', description: 'Unit bisnis perbankan retail individual' },
      { code: 'BU-SME', name: 'SME & Wholesale', description: 'Unit bisnis untuk UKM dan wholesale' },
      { code: 'BU-CORP', name: 'Corporate Banking', description: 'Unit bisnis untuk korporasi besar' },
      { code: 'BU-IT', name: 'Information Technology', description: 'Unit pendukung teknologi informasi' },
    ];

    for (const bu of businessUnits) {
      let existing = await buRepo.findOne({ where: { code: bu.code } });
      if (!existing) {
        existing = new MasterBusinessUnit();
        existing.code = bu.code;
      }
      existing.name = bu.name;
      existing.description = bu.description;
      existing.is_active = true;
      await buRepo.save(existing);
      console.log(`Saved Business Unit: ${bu.code}`);
    }

    // Seed Product Categories
    const productCategories = [
      { code: 'CAT-MOBILE', name: 'Mobile Application', description: 'Produk berbasis aplikasi mobile (Android/iOS)' },
      { code: 'CAT-WEB', name: 'Web Platform', description: 'Produk berbasis portal web atau dashboard' },
      { code: 'CAT-API', name: 'API Service', description: 'Layanan integrasi API untuk eksternal/internal' },
      { code: 'CAT-PAYMENT', name: 'Payment System', description: 'Sistem pembayaran dan gateway' },
      { code: 'CAT-INTERNAL', name: 'Internal Tool', description: 'Alat bantu operasional internal' },
    ];

    for (const cat of productCategories) {
      let existing = await catRepo.findOne({ where: { code: cat.code } });
      if (!existing) {
        existing = new MasterProductCategory();
        existing.code = cat.code;
      }
      existing.name = cat.name;
      existing.description = cat.description;
      existing.is_active = true;
      await catRepo.save(existing);
      console.log(`Saved Product Category: ${cat.code}`);
    }

    console.log('Seeding Master Data completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
