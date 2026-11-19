"use client";
import ControlField from "@/components/form/controller-field/control-field";
import SelectController from "@/components/form/select/selectController";
import { EAnswerType } from "@/enum/question.enum";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { wholeSureveySchema, WholeSurveyInput } from "./survey.type";
import styles from "./survey-form.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import ControllerRadio from "@/components/form/controller-radio/controller-radio";
import { EProgram } from "@/enum/program.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/features/store";
import { createSurveyAsync } from "@/features/survey/handle-survey/survey.action";
import { useRouter } from "next/navigation";

const questionTypeOption = [
  {
    label: "Multiple Choice Question",
    value: EAnswerType.MCQ,
  },
  {
    label: "Rating 1 - 5",
    value: EAnswerType.RATING,
  },
  {
    label: "TEXT",
    value: EAnswerType.TEXT,
  },
];

const isRequiredOptions = [
  {
    label: "true",
    value: true,
  },
  {
    label: "false",
    value: false,
  },
];

const Program = [
  {
    label: "BTech",
    value: EProgram.BTECH,
  },
  {
    label: "MTech",
    value: EProgram.MTECH,
  },
];

const defaultValues: WholeSurveyInput = {
  title: "",
  description: "",
  program: EProgram.BTECH,
  activation_date: "",
  expiration_date: "",
  questions: [
    {
      title: "",
      is_required: false,
      answer_type: EAnswerType.TEXT,
      options: {},
    },
  ],
};

export default function SurveyForm() {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const { control, handleSubmit } = useForm<WholeSurveyInput>({
    resolver: zodResolver(wholeSureveySchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });



  const onSubmit: SubmitHandler<WholeSurveyInput> = (data) => {
    dispatch(createSurveyAsync(data));
    router.push("/admin")
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Typography variant="h2">Survey Details</Typography>
        <Stack spacing={2}>
          <Box>
            <ControlField
              control={control}
              name="title"
              label="Title"
              placeholder=""
            />
          </Box>

          <Box>
            <ControlField
              control={control}
              name="description"
              label="Description (optional)"
              placeholder=""
            />
          </Box>

          <Box>
            <SelectController
              control={control}
              name="program"
              label="Student Program"
              options={Program}
            />
          </Box>

          <Box>
            <ControlField
              control={control}
              name="activation_date"
              type="datetime-local"
              label="Activation Time"
              placeholder=""
            />
          </Box>
          <Box>
            <ControlField
              control={control}
              name="expiration_date"
              label="Expiration Time"
              type="datetime-local"
              placeholder=""
            />
          </Box>
        </Stack>
      </Stack>

      <Stack sx={{ mt: "3rem" }}>
        <Typography variant="h3">Questions</Typography>
        <Stack spacing={3}>
          {fields.map((field, index) => (
            <Box
              aria-label="Question"
              key={field.id}
              className={styles.QuestionBox}
            >
              <Stack
                direction={"row"}
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Typography>Question {index + 1}</Typography>
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Stack spacing={3}>
                <ControlField
                  control={control}
                  name={`questions.${index}.title`}
                  placeholder="Enter You Question"
                />

                <ControllerRadio
                  label="is required?"
                  control={control}
                  name={`questions.${index}.is_required`}
                  options={isRequiredOptions}
                />

                <SelectController
                  control={control}
                  label="Answer Type"
                  options={questionTypeOption}
                  name={`questions.${index}.answer_type`}
                />
              </Stack>
            </Box>
          ))}
          <Box sx={{ width: "100%" }}>
            <Button
              variant="outlined"
              className={styles.button}
              onClick={() =>
                append({
                  title: "",
                  is_required: false,
                  answer_type: EAnswerType.TEXT,
                  options: {},
                })
              }
            >
              Add Question
            </Button>
          </Box>
        </Stack>
      </Stack>
      <Box>
        <Button
          variant="contained"
          type="submit"
          className={styles.submitButton}
        >
          Publish
        </Button>
      </Box>
    </form>
  );
}
