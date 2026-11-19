import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { EAnswerType } from '../enum/answer-type.enum.js';
import { Survey } from '../../surveys/entities/survey.entity.js';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  survey_id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'enum', enum: EAnswerType })
  answer_type: EAnswerType;

  @Column({ type: 'boolean', default: false })
  is_required: boolean;

  @Column({ type: 'jsonb', nullable: true })
  options: Object;

  @CreateDateColumn()
  created_at: Date;


  @ManyToOne(()=> Survey, (survey) => survey.Question)
  @JoinColumn({name : 'survey_id'})
  Survey : Relation<Survey>
}
