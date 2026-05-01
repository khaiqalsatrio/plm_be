import * as fs from 'fs';
import * as path from 'path';
import { DataSource } from 'typeorm';

import Constant from '../common/constant';
import { ProductType, SectionType, ScoreType, QuestionType, AnswerType } from '../common/constant/enum';
import { AssessmentCriteria } from '../entities/assessment-criteria.entity';
import { AssessmentQuestion } from '../entities/assessment-question.entity';
import { AssessmentSection } from '../entities/assessment-section.entity';
import { AssessmentTemplate } from '../entities/assessment-template.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: Constant.DB_HOST,
    port: Constant.DB_PORT,
    username: Constant.DB_USER,
    password: Constant.DB_PASSWORD,
    database: Constant.DB_NAME,
    entities: [
      AssessmentTemplate,
      AssessmentSection,
      AssessmentCriteria,
      AssessmentQuestion,
    ],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('Database connection initialized');

    const jsonPath = path.join(__dirname, '../../SPEC/plm_product_assessment_seed_template.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(rawData);

    const templateRepo = dataSource.getRepository(AssessmentTemplate);
    const sectionRepo = dataSource.getRepository(AssessmentSection);
    const criteriaRepo = dataSource.getRepository(AssessmentCriteria);
    const questionRepo = dataSource.getRepository(AssessmentQuestion);

    for (const tplData of data.templates) {
      console.log(`Processing template: ${tplData.template_code}`);
      
      let template = await templateRepo.findOne({ where: { template_code: tplData.template_code } });
      if (!template) {
        template = new AssessmentTemplate();
        template.template_code = tplData.template_code;
      }

      template.template_name = tplData.template_name;
      template.product_type = tplData.product_type as ProductType;
      template.version = tplData.version;
      template.description = tplData.description;
      template.is_active = tplData.is_active;
      template.published_at = new Date();

      const savedTemplate = await templateRepo.save(template);
      console.log(`Saved template: ${savedTemplate.template_code} (${savedTemplate.id})`);

      for (const secData of tplData.sections) {
        let section = await sectionRepo.findOne({ 
          where: { 
            template_id: savedTemplate.id, 
            section_code: secData.section_code 
          } 
        });
        
        if (!section) {
          section = new AssessmentSection();
          section.template_id = savedTemplate.id;
          section.section_code = secData.section_code;
        }

        section.section_name = secData.section_name;
        section.section_type = secData.section_type as SectionType;
        section.weight = secData.weight;
        section.sort_order = secData.sort_order;
        section.is_required = secData.is_required;

        const savedSection = await sectionRepo.save(section);
        console.log(`  Saved section: ${savedSection.section_code} (${savedSection.id})`);

        for (const critData of secData.criteria) {
          let criteria = await criteriaRepo.findOne({ 
            where: { 
              section_id: savedSection.id, 
              criteria_code: critData.criteria_code 
            } 
          });

          if (!criteria) {
            criteria = new AssessmentCriteria();
            criteria.section_id = savedSection.id;
            criteria.criteria_code = critData.criteria_code;
          }

          criteria.criteria_name = critData.criteria_name;
          criteria.description = critData.description;
          criteria.weight = critData.weight;
          criteria.score_type = critData.score_type as ScoreType;
          criteria.sort_order = critData.sort_order;
          criteria.is_required = critData.is_required;

          const savedCriteria = await criteriaRepo.save(criteria);
          console.log(`    Saved criteria: ${savedCriteria.criteria_code} (${savedCriteria.id})`);

          for (const qstData of critData.questions) {
            let question = await questionRepo.findOne({ 
              where: { 
                criteria_id: savedCriteria.id, 
                question_code: qstData.question_code 
              } 
            });

            if (!question) {
              question = new AssessmentQuestion();
              question.criteria_id = savedCriteria.id;
              question.question_code = qstData.question_code;
            }

            question.question_text = qstData.question_text;
            question.question_type = qstData.question_type as QuestionType;
            question.answer_type = qstData.answer_type as AnswerType;
            question.weight = qstData.weight;
            question.is_required = qstData.is_required;
            question.help_text = qstData.help_text;
            question.sort_order = qstData.sort_order;

            const savedQuestion = await questionRepo.save(question);
            console.log(`      Saved question: ${savedQuestion.question_code} (${savedQuestion.id})`);
          }
        }
      }
    }

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seed();
