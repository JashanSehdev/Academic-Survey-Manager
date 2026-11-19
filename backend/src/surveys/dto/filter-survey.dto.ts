import { IsOptional, IsString } from "class-validator";
import { FilterDto } from "../../common/dto/filter-dto.js";

export class FilterSurveysDto extends FilterDto {

    @IsOptional()
    @IsString()
    is_activated : String


}   