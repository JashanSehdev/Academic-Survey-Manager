
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SurveyData {
  id: number;
  title: string;
  description: string | null;
  program: string;
  is_activated: boolean;
  activation_date: string;
  expiration_date: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  Question: QuestionItem[];
}

export interface McqOptions {
  choices: string[];
}

export interface RatingOptions {
  min: number;
  max: number;
}

export interface TextOptions {}

export type QuestionOptions = McqOptions | RatingOptions | TextOptions;

export type AnswerType = 'mcq' | 'rating' | 'text';

export interface QuestionItem {
  id: number;
  title: string;
  answer_type: AnswerType;
  is_required: boolean;
  options: QuestionOptions;
}

export type CreateSurveyResponse = ApiResponse<SurveyData>;