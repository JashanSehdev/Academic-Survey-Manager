"use client";
import { useAppDispatch } from "@/features/store";
import usePaginatedList from "./use-paginated-list";
import { fetchCreatedSurveys } from "@/features/survey/handle-survey/survey.action";
import { SurveyData } from "@/type/survey.type";
import { AdminSurvayFilter } from "@/features/survey/handle-survey/survey.type";
import { useCallback } from "react";

export function useCreatedSurvey() {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async (params: AdminSurvayFilter) => {
    return dispatch(fetchCreatedSurveys(params)).unwrap();
  }, [dispatch]);
  return usePaginatedList<SurveyData, AdminSurvayFilter>({
    fetchData,
    limit: 6,
  });
}
