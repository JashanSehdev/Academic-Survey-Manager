"use client";
import { useAppDispatch } from "@/features/store";
import usePaginatedList from "./use-paginated-list";
import {
  fetchProgramSurveysAsync,
} from "@/features/survey/handle-survey/survey.action";
import { SurveyData } from "@/type/survey.type";
import {
  SurveyFilters,
} from "@/features/survey/handle-survey/survey.type";
import { useCallback } from "react";

export function useProgramSurveys() {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async (params: SurveyFilters) => {
      return dispatch(fetchProgramSurveysAsync(params)).unwrap();
    },
    [dispatch],
  );
  return usePaginatedList<SurveyData, SurveyFilters>({
    fetchData,
    limit: 6,
  });
}
