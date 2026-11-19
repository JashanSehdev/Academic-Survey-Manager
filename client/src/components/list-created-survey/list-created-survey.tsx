'use client'
import { useCreatedSurvey } from "@/hooks/use-created-survey";
import { FormControlLabel, Pagination, Stack, Switch, TextField, ToggleButton, Typography } from "@mui/material";
import SurveyCard from "../survey-card/survey-card";
import { AdminSurvayFilter, SurveyFilters } from "@/features/survey/handle-survey/survey.type";
import { useDebounce } from "@/utils/debounce";
import { useCallback, useEffect, useState } from "react";


export function ListCreatedSurvey () {
    const {data, totalPages,page,  setPage, setFilters, filters} = useCreatedSurvey();
    const debounce = useDebounce((search : string) => setFilters((prev ) => ( { ...prev, search})), 500)
    const [search, setSearch] = useState<string>("")
    const [isActivated, setIsActivated] = useState<boolean>(filters.is_activated ?? false)
    
    const handleOnlyActivated = useCallback(() => {
        setFilters((prev ) => ( { ...prev, is_activated: isActivated}))
    },[isActivated])
    useEffect(() => { debounce(search)
        handleOnlyActivated()
        
    },[debounce, search, isActivated, handleOnlyActivated])
    return (
        <Stack spacing={3}>
            <Typography variant="h2">
                Forms Created By You
            </Typography>
            <Stack direction={'row'} useFlexGap spacing={2}>
                <TextField 
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{flex: 1}}
                    placeholder="search"
                />
                
                <FormControlLabel control={<Switch value={isActivated} defaultChecked onChange={(e) => setIsActivated(e.target.checked)} />} label={isActivated ? 'activated' : 'not_activated'} />
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