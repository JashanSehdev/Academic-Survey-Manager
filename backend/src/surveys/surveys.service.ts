import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from '../common/service/base.service.js';
import { Survey } from './entities/survey.entity.js';
import {
  DataSource,
  EntityManager,
  FindOptionsWhere,
  MoreThan,
  Repository,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWholeSurveyDto } from './dto/create-whole-survey.dto.js';
import { Question } from '../questions/entities/question.entity.js';
import { successResponse } from '../common/utlis/response.js';
import { FilterSurveysDto } from './dto/filter-survey.dto.js';
import { applyFilters } from '../common/utlis/filter.js';
import { paginationResponse } from '../common/utlis/pagination.js';
import { GeneralFilterDto } from './dto/general-filters.dto.js';
import { User } from '../users/entities/users.entity.js';

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
        await questionRepo.save(questionEntities);

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

  async findCreatedSurveys(filters: FilterSurveysDto, userId: number) {
    const baseWhere: FindOptionsWhere<Survey> = {
      created_by: userId,
    };
    const { page, limit } = filters;
    const skip = (page - 1) * limit;

    if (filters.is_activated) {
      baseWhere.is_activated = filters.is_activated === 'true';
    }
    const [where, order] = applyFilters(
      filters,
      {
        where: baseWhere,
      },
      {
        searchOn: ['title'],
        sortOn: ['created_at'],
        defaultOrder: 'asc',
      },
    );

    const [surveys, total] = await this.surveyRepository.findAndCount({
      where,
      order,
      skip: skip,
      take: limit,
    });

    return paginationResponse(surveys, page, limit, total);
  }

  async getSurvey(surveyId: number) {
    const survey = await this.surveyRepository.findOne({
      where: {
        id: surveyId,
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

  async findSurvey(surveyId: number) {
    const survey = await this.getSurvey(surveyId);

    if (!survey) throw new NotFoundException('survey not found');

    return successResponse('Survey Fetch Successfully', survey);
  }

  async setActivation(surveyId: number, activate: boolean, userId: number) {
    const survey = this.surveyRepository.findOneBy({
      created_by: userId,
      id: surveyId,
    });

    if (!survey) throw new NotFoundException('Survey not found');

    await this.update(surveyId, { is_activated: activate });

    return { message: 'survey updated Successfully' };
  }

  async findSurveys(filters: GeneralFilterDto, userId: number) {
    const baseWhere: FindOptionsWhere<Survey> = {
      is_activated: true,
    };

    console.log(filters);
    const { page, limit } = filters;
    const skip = (page - 1) * limit;

    const userRepo = this.datasource.getRepository(User);

    const userProgram = await userRepo.findOne({
      where: {
        id: userId,
      },
      select: {
        program: true,
      },
    });

    if (userProgram) {
      baseWhere.program = userProgram.program
    }

    if (filters.upcoming === 'true') {
      baseWhere.activation_date === MoreThan(new Date());
    }

    const [where, order] = applyFilters(
      filters,
      {
        where: baseWhere,
      },
      {
        searchOn: ['title'],
        sortOn: ['created_at'],
        defaultOrder: 'asc',
      },
    );

    const [surveys, total] = await this.surveyRepository.findAndCount({
      where,
      order,
      skip: skip,
      take: limit,
    });

    return paginationResponse(surveys, page, limit, total);
  }
}
