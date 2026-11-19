import { IsBoolean, IsEnum, IsObject, IsString } from "class-validator";
import { EAnswerType } from "../enum/answer-type.enum.js";

export class CreateQuestionDto {

    @IsString()
    title : string

    @IsBoolean()
    is_required : boolean

    @IsEnum(EAnswerType)
    answer_type : EAnswerType

    @IsObject()
    options: Object

}
