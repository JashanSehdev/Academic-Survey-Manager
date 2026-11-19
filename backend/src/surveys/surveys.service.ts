import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseService } from '../common/service/base.service.js';
import { Survey } from './entities/survey.entity.js';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWholeSurveyDto } from './dto/create-whole-survey.dto.js';
import { Question } from '../questions/entities/question.entity.js';
import { successResponse } from '../common/utlis/response.js';

@Injectable()
export class SurveysService extends BaseService<Survey> {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,

    private readonly datasource: DataSource,
  ) {
    super(surveyRepository);
  }

  async createSurvey(
    createWholeSurveyDto: CreateWholeSurveyDto,
    userId: number,
  ) {
    const survey = await this.datasource.transaction(
      async (manager: EntityManager) => {
        const surveyRepo = manager.getRepository(Survey);
        const questionRepo = manager.getRepository(Question);

        const survey = surveyRepo.create({
          ...createWholeSurveyDto,
          created_by: userId,
        });

        const savedSurvey = await surveyRepo.save(survey);

        const questions = createWholeSurveyDto.questions;

        const questionEntities = questions.map((question) =>
          questionRepo.create({
            ...question,
            survey_id: savedSurvey.id,
          }),
        );
        await questionRepo.save(questionEntities)

        return savedSurvey;
      },
    );

    const wholeSurvey = await this.getSurvey(survey.id);

    if (!wholeSurvey)
      throw new InternalServerErrorException(
        'unable to create surve, try again',
      );

    return successResponse('Survey created successfully', wholeSurvey);
  }

  async getSurvey(sureveyId: number) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: sureveyId,
      },
      relations: {
        Question: true,
      },

      select: {
        Question: {
          id: true,
          title: true,
          answer_type: true,
          is_required: true,
          options: true,
        },
      },
    });

    return survey;
  }
}
