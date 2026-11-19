import { Stack, Typography } from "@mui/material";
import styles from './header.module.css'

export default function Header () {

    return (
        <Stack spacing={2} className={styles.container}>
            <Typography variant="h3">Create Survey</Typography>
            <Typography color={'textSecondary'}> Here you can create The Survey</Typography>
        </Stack>
    )
}