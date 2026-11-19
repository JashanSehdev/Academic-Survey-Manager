import { Container } from "@mui/material";
import styles from './create-survey.module.css'
import Header from "@/components/create-survey/header/header";

export default function CreateSurvey () {


    return (
        <Container className={styles.container}>
            <Header/>
        </Container>
    )
}