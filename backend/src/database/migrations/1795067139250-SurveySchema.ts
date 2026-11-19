import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class SurveySchema1795067139250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
                    new Table({
                        name : 'surveys',
                        columns : [
                            {
                                name : 'id',
                                type : 'integer',
                                isPrimary: true,
                                isGenerated : true,
                                generationStrategy: 'increment'
                            },
                            {
                                name : 'title',
                                type : 'varchar',
                            },
                            {
                                name : 'description',
                                type : 'text',
                                isNullable : true,

                            },
        
                            {
                                name : 'program',
                                type : 'enum',
                                enum : ['btech', 'mtech'],
                            },

                            {
                                name : 'is_activated',
                                type : 'boolean',
                                default : false
                            },
        
                            {
                                name : 'activation_date',
                                type : 'timestamp',
                            },

                            {
                                name : 'expiration_date',
                                type : 'timestamp',
                            },
        
                            {
                                name : 'created_by',
                                type : 'integer'
                            },

                            {
                                name : 'created_at',
                                type : 'timestamp',
                                default : 'CURRENT_TIMESTAMP'
                            }, 
        
                            {
                                name : 'updated_at',
                                type : 'timestamp',
                                default : 'CURRENT_TIMESTAMP'
                            }
                        ],
                        foreignKeys : [
                            {
                                name : 'fk_survey_createdBy',
                                columnNames : ['created_by'],
                                referencedColumnNames : ['id'],
                                referencedTableName: 'users'
                            }
                        ]
                    })
                )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('surveys')
    }

}
