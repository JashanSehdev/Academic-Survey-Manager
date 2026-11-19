'use client'
import { Box, Container, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";
import { ListProgramSurveys } from "@/components/list-program-surveys/list-program-surveys";
import { ListUpcomingSurveys } from "@/components/list-upcomming-survey/upcomming-survey-forms";
import { useAppSelector } from "@/features/store";

export default function App() {
  const user = useAppSelector((state) => state.auth.user)
  return (
    <Container className={styles.main}>
      <Navbar />
      <Box>
        <Stack spacing={-2} sx={{margin: '5rem 0'}}>
          <Typography variant={"h1"}>Welcome {user?.username}</Typography>
          <Typography sx={{ paddingLeft: 1 }} variant="h1">
          </Typography>
        </Stack>
     
        <Stack spacing={5}>
          <ListProgramSurveys />

          <ListUpcomingSurveys />
        </Stack>
      </Box>
    </Container>
  );
}
