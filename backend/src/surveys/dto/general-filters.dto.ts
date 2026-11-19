import { IsOptional, IsString } from "class-validator";
import { FilterDto } from "../../common/dto/filter-dto.js";


export class GeneralFilterDto extends FilterDto{
    
    @IsOptional()
    @IsString()
    upcoming : string
}   