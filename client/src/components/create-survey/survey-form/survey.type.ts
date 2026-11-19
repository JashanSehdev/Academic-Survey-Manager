import { EProgram } from "@/enum/program.enum";
import { EAnswerType } from "@/enum/question.enum";
import z from "zod";


const questionSchema = z.object({
    title : z.string(),
    is_required: z.boolean(),
    answer_type : z.enum(EAnswerType),
    options: z.object()
})

export const wholeSureveySchema = z.object({
    title : z.string().min(4, 'title should be at least 4 character'),
    description : z.string().optional(),
    program : z.enum(EProgram),
    activation_date : z.string().min(4, 'activation time required'),
    expiration_date : z.string().min(4, 'expiration time required'),
    questions : z.array(questionSchema).min(1, 'at least one question required')
})
.refine((data) => {
    const startDate = new Date(data.activation_date);
    const now = new Date();

    return !isNaN(startDate.getTime()) && startDate > now;
  }, {
    message : 'Start Time should be in future',
    path : ['activation_date']
  })
  .refine((data) => {
    const startDate = new Date(data.activation_date);
    const endDate = new Date(data.expiration_date);

    return !isNaN(endDate.getTime()) && endDate > startDate;
  }, {
    message : 'EndTime should be after start time',
    path : ['expiration_date']
  })


export type WholeSurveyInput = z.infer<typeof wholeSureveySchema>