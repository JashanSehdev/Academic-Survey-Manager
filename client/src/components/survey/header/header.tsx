import { Stack, Typography } from "@mui/material";
import styles from './header.module.css'

export default function Header () {

    return (
        <Stack spacing={2} className={styles.container}>
            <Typography variant="h3">Fill Survey</Typography>
            <Typography color={'textSecondary'}> Kindly Fill the Survey</Typography>
        </Stack>
    )
}