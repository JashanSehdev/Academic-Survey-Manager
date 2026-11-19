import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class QuestionSchema1795067660286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                            new Table({
                                name : 'questions',
                                columns : [
                                    {
                                        name : 'id',
                                        type : 'integer',
                                        isPrimary: true,
                                        isGenerated : true,
                                        generationStrategy: 'increment'
                                    },
                                    {
                                        name : 'survey_id',
                                        type : 'integer',
                                    },
                                    {
                                        name : 'title',
                                        type : 'text',
                                        isNullable : true,
        
                                    },
                
                                    {
                                        name : 'answer_type',
                                        type : 'enum',
                                        enum : ['mcq', 'rating' ,'text'],
                                        default : "'text'"
                                    },
                
                                    {
                                        name : 'is_required',
                                        type : 'boolean',
                                        default : false
                                    },
        
                                    {
                                        name : 'options',
                                        type : 'jsonb',
                                        isNullable: true
                                    },
                

                                    {
                                        name : 'created_at',
                                        type : 'timestamp',
                                        default : 'CURRENT_TIMESTAMP'
                                    }, 
          
                                ],
                                foreignKeys : [
                                    {
                                        name : 'fk_survey_questions',
                                        columnNames : ['survey_id'],
                                        referencedColumnNames : ['id'],
                                        referencedTableName: 'surveys'
                                    }
                                ]
                            })
                        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('questions', true)
    }

}
