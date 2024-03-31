import { Box, Skeleton, Grid } from "@mui/material";

export function EmployeeItemSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        marginY: "30px",
      }}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
    </Box>
  );
}

export function EmployeeListSkeletons() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
      <Grid item xs={3}>
        <EmployeeItemSkeleton />
      </Grid>
    </Grid>
  );
}
