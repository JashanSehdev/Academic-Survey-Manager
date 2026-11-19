import { EProgram } from "@/enum/program.enum";


export interface SurveyFilters {
    search ?: string,
    upcoming ?: boolean
}

export interface AdminSurvayFilter extends SurveyFilters {
    program  ?: EProgram
    is_activated:  boolean
}