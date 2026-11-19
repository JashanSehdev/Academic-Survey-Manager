'use client'
import { Pagination, Stack, TextField, Typography } from "@mui/material";
import { useDebounce } from "@/utils/debounce";
import {  useEffect, useState } from "react";
import { useProgramSurveys } from "@/hooks/use-program-surveys";
import SurveyCard from "./card/survey-card";


export function ListProgramSurveys () {
    const {data, totalPages,page,  setPage, setFilters, filters} = useProgramSurveys();
    const debounce = useDebounce((search : string) => setFilters((prev ) => ( { ...prev, search})), 500)
    const [search, setSearch] = useState<string>("")
    
    
    useEffect(() => { debounce(search)

    },[debounce, search])
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                Survey Forms
            </Typography>
            <Stack direction={'row'} useFlexGap spacing={2}>
                <TextField 
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{flex: 1}}
                    placeholder="search"
                />
                
            </Stack>
            <Stack direction={'row'} useFlexGap spacing={2} sx={{
                flexWrap : 'wrap'
            }}>
                {
                    data.map((survey) => (
                        <SurveyCard survey={survey} key={survey.id} />
                    ))
                }
            </Stack>
            <Pagination page={page} count={totalPages} onChange={(_, page) => setPage(page)}/>
    
        </Stack>
    )
}