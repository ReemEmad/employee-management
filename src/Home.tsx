import { Grid, Typography, Link, Box } from "@mui/material";
import HomeSVG from "./assets/home.svg"
import styles from "./Home.module.css";

function Home() {
  return (
    <Box>
        <Grid container spacing={2}>
                <Grid item xs={5} xl={5} lg={5} sx={{my:'auto', mx:'auto'}}>
                    <img src={HomeSVG} alt="homelogo" width={"100%"}></img>
                </Grid>
                <div className={styles.divider}></div>
                <Grid item xs={5} xl={5} lg={5} sx={{my:'auto', mx:'auto', width:"100%"}}>
                <Typography variant="h4" sx={{mb:1}}>
                    Welcome To The Employee Portal
                </Typography>
                <Link href="./employee-entry" underline="hover" sx={{pr: 2}}>
                    Employee Entry
                </Link>
                <Link href="./employee-query" underline="hover">
                    Employee Query
                </Link>
                </Grid>
        </Grid>
    </Box>
  )
}

export default Home