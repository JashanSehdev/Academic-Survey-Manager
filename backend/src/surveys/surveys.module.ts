import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service.js';
import { SurveysController } from './surveys.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity.js';

@Module({
  imports : [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
