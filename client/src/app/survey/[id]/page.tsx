import Survey from "@/components/survey/survey"
import { Container } from "@mui/material"

export default async function SurveyPage ({params} : {params : Promise<{id : string}>}) {
    const {id} = await params


    return (
        <Container sx={{paddingTop : '3rem'}}>
        <Survey id={Number(id)} />
        </Container>
    )
}