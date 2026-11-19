import { api, getErrorMessage } from "@/api/api";
import { WholeSurveyInput } from "@/components/create-survey/survey-form/survey.type";
import { ApiResponse, CreateSurveyResponse, SurveyData } from "@/type/survey.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { AdminSurvayFilter, SurveyFilters } from "./survey.type";
import { PaginationResponse } from "@/type/meta.type";

export const createSurveyAsync = createAsyncThunk<
  ApiResponse<CreateSurveyResponse>,
  WholeSurveyInput
>("survey/create", async (data, thunkApi) => {
  try {
    const respose = await api.post("/surveys", data);
    enqueueSnackbar('Survey Created Successfully')
    return respose.data;
  } catch (error: unknown) {
    enqueueSnackbar(getErrorMessage(error));
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});


export const fetchCreatedSurveys = createAsyncThunk<
  PaginationResponse<SurveyData>,
  AdminSurvayFilter
>("survey/fetch-created", async (params, thunkApi) => {
  try {
    const respose = await api.get("/surveys/created", {
      params
    });

    return respose.data;
  } catch (error: unknown) {
    enqueueSnackbar(getErrorMessage(error));
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const changeActivationAsync = createAsyncThunk<
  PaginationResponse<SurveyData>,
  {activate : boolean, id : number}
>("survey/activate", async (data, thunkApi) => {
  try {
    const respose = await api.patch("/surveys/" + data.id + "/activation", data);

    return respose.data;
  } catch (error: unknown) {
    enqueueSnackbar(getErrorMessage(error));
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});


export const fetchProgramSurveysAsync = createAsyncThunk<
  PaginationResponse<SurveyData>,
  SurveyFilters
>("survey/fetch-created", async (params, thunkApi) => {
  try {
    const respose = await api.get("/surveys", {
      params
    });

    return respose.data;
  } catch (error: unknown) {
    enqueueSnackbar(getErrorMessage(error));
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});


export const fetchSurveyAsync = createAsyncThunk<
  ApiResponse<SurveyData>,
  number
>("survey/fetch-survey", async (sId, thunkApi) => {
  try {
    const respose = await api.get("/surveys/" + sId);

    return respose.data;
  } catch (error: unknown) {
    enqueueSnackbar(getErrorMessage(error));
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});