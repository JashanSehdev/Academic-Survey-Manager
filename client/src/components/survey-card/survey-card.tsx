"use client";
import { useAppDispatch } from "@/features/store";
import { changeActivationAsync } from "@/features/survey/handle-survey/survey.action";
import { SurveyData } from "@/type/survey.type";
import { formatTime } from "@/utils/format-time";
import {
  Card,
  CardContent,
  CardHeader,
  Switch,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useCallback, useState } from "react";

export default function SurveyCard({ survey }: { survey: SurveyData }) {
  const [activate, setActivate] = useState<boolean>(survey.is_activated);
  const dispatch = useAppDispatch();
    console.log(survey)
    const setActivation = useCallback (async (set : boolean) => {
      try {
        setActivate(set)
        await dispatch(changeActivationAsync({ activate, id : survey.id })).unwrap();
        enqueueSnackbar('action successful', { variant : 'success'})
      } catch {
        enqueueSnackbar('Unable to set activation', {variant : 'error'})
      }
    } ,[dispatch, activate])

    
  return (
    <Card>
      <CardHeader
        title={survey.title}
        subheader={survey.description}
        sx={{
          "& .MuiCardHeader-content": {
            overflow: "hidden",
          },

          maxWidth: "200px",
          flex: "1 1 200px",
        }}
        slotProps={{
          title: { noWrap: true },
          subheader: { noWrap: true },
        }}
      />

      <CardContent>
        <Typography>
          Active At : {formatTime(new Date(survey.activation_date))}{" "}
        </Typography>
        <Typography>
          Expire At : {formatTime(new Date(survey.activation_date))}{" "}
        </Typography>
        <Switch
        value={activate}
          defaultChecked={activate}
          onChange={(e) => {setActivation(e.target.checked)}}
        />
      </CardContent>
    </Card>
  );
}
