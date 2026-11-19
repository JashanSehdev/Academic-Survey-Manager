import { IsEnum, IsOptional, IsString } from "class-validator";
import { EProgram } from "../../users/enum/program.enum.js";

export class CreateSurveyDto {

    @IsString()
    title : string

    @IsOptional()
    @IsString()
    description : string

    @IsEnum(EProgram)
    program : EProgram

    @IsString()
    activation_date : string

    @IsString()
    expiration_date : string

}
