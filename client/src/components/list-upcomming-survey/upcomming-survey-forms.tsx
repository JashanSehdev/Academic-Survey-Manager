"use client";
import { Pagination, Stack, TextField, Typography } from "@mui/material";
import { useDebounce } from "@/utils/debounce";
import { useEffect, useState } from "react";
import { useProgramSurveys } from "@/hooks/use-program-surveys";
import SurveyCard from "../list-program-surveys/card/survey-card";

export function ListUpcomingSurveys() {
  const { data, totalPages, page, setPage, setFilters } = useProgramSurveys();
  const debounce = useDebounce(
    (search: string) => setFilters((prev) => ({ ...prev, search })),
    500,
  );
  const [search, setSearch] = useState<string>("");

  const setupcomingSurveys = () => {
    setFilters((prev) => ({ upcoming: true, ...prev }));
  };

  useEffect(() => {
    debounce(search);
    setupcomingSurveys();
  }, [debounce, search]);
  return (
    <Stack spacing={3}>
      <Typography variant="h2">Upcoming Survey Forms</Typography>
      <Stack direction={"row"} useFlexGap spacing={2}>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 1 }}
          placeholder="search"
        />
      </Stack>
      <Stack
        direction={"row"}
        useFlexGap
        spacing={2}
        sx={{
          flexWrap: "wrap",
        }}
      >
        {data.map((survey) => (
          <SurveyCard survey={survey} key={survey.id} />
        ))}
      </Stack>
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_, page) => setPage(page)}
      />
    </Stack>
  );
}
