import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { CreateSurveyDto } from "./create-survey.dto.js";
import { Type } from "class-transformer";
import { CreateQuestionDto } from "../../questions/dto/create-question.dto.js";


export class CreateWholeSurveyDto extends CreateSurveyDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions : CreateQuestionDto[]
    
}

