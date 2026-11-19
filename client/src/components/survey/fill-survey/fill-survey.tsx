'use client'
import { Stack, Typography } from "@mui/material";
import { QuestionItem } from "@/type/survey.type";
import { useForm } from "react-hook-form";
import ControlField from "@/components/form/controller-field/control-field";

export default function FillSurvey({ questions }: { questions: QuestionItem[] }) {

  const {control, handleSubmit} = useForm()

  const onSubmit  = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
            {
                questions.map((ques) => {
                    return (
                       

                        
                        <Stack key={ques.id} spacing={2}>
                            <Typography variant="h6">
                                Q: {ques.title}
                            </Typography>
                            {
                
                                <ControlField 
                                control = {control}
                                  name ="response"
                                  label = "Response"
                                /> 
                            }
                        </Stack>
                    )
                })
            }
        </Stack>

      
    </form>
  );
}
