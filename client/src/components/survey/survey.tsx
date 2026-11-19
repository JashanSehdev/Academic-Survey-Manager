"use client";

import { SurveyData } from "@/type/survey.type";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Header from "./header/header";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/features/store";
import { fetchSurveyAsync } from "@/features/survey/handle-survey/survey.action";
import { getErrorMessage } from "@/api/api";
import { formatTime } from "@/utils/format-time";
import { EAnswerType } from "@/enum/question.enum";
import ControlField from "../form/controller-field/control-field";
import FillSurvey from "./fill-survey/fill-survey";

export default function Survey({ id }: { id: number }) {
  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSurvey = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await dispatch(fetchSurveyAsync(id)).unwrap();

        setSurvey(result.data);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id, dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !survey) {
    return <Typography>{error ?? `404 not found`}</Typography>;
  }
  return (
    <Box>
      {/* <Header /> */}

      <Stack spacing={5}>
        <Stack spacing={1}>
          <Typography variant="h2"> {survey.title}</Typography>

          <Typography> {survey.description}</Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography>For Program : {survey.program}</Typography>

          <Typography>Expire at : {formatTime( new Date(survey.expiration_date))}</Typography>
        </Stack>

        <FillSurvey questions= {survey.Question} />
      </Stack>

    </Box>
  );
}
