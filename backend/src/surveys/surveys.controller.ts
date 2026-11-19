import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { SurveysService } from './surveys.service.js';
import { CreateSurveyDto } from './dto/create-survey.dto.js';
import { UpdateSurveyDto } from './dto/update-survey.dto.js';
import { RoleGuard } from '../auth/guard/auth.guard.js';
import { Roles } from '../auth/decorator/roles.decorator.js';
import { Role } from '../users/enum/roles.enum.js';
import { CreateWholeSurveyDto } from './dto/create-whole-survey.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { FilterSurveysDto } from './dto/filter-survey.dto.js';
import { GeneralFilterDto } from './dto/general-filters.dto.js';

@Controller('surveys')
@UseGuards(RoleGuard)
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Roles([Role.ADMIN])
  @Post()
  create(@Body() createWholeSurveyDto: CreateWholeSurveyDto, @CurrentUser('id') userId : number) {
    console.log(createWholeSurveyDto)
    return this.surveysService.createSurvey(createWholeSurveyDto, userId);

  }

  @Get()
  findAll( @Query() filters :  GeneralFilterDto, @CurrentUser('id') userId :  number) {
    return this.surveysService.findSurveys( filters, userId)
  }


  @Roles([Role.ADMIN])
  @Get('created')
  findCreatedSurveys( @Query() filterSurveys : FilterSurveysDto, @CurrentUser('id') userId : number) {
    return this.surveysService.findCreatedSurveys(filterSurveys, userId)
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.surveysService.findSurvey(+id);
  }

  @Roles([Role.ADMIN])
  @Patch(':id/activation')
  update(@Param('id') id: string, @Body() {activate}: {activate : boolean}, @CurrentUser('id') userId: number) {
    return this.surveysService.setActivation(+id, activate, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(+id);
  }
}
