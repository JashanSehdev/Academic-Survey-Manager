import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SurveysService } from './surveys.service.js';
import { CreateSurveyDto } from './dto/create-survey.dto.js';
import { UpdateSurveyDto } from './dto/update-survey.dto.js';
import { RoleGuard } from '../auth/guard/auth.guard.js';
import { Roles } from '../auth/decorator/roles.decorator.js';
import { Role } from '../users/enum/roles.enum.js';
import { CreateWholeSurveyDto } from './dto/create-whole-survey.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';

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
  findAll() {
    return this.surveysService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.surveysService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(+id, updateSurveyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.surveysService.remove(+id);
  }
}
