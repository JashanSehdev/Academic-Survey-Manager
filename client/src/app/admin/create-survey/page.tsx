import { Container } from "@mui/material";
import styles from './create-survey.module.css'
import Header from "@/components/create-survey/header/header";
import SurveyForm from "@/components/create-survey/survey-form/survey-form";

export default function CreateSurvey () {


    return (
        <Container className={styles.container}>
            <Header/>

            <SurveyForm/>
        </Container>
    )
}