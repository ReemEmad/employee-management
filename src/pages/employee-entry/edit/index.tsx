import { useParams } from "react-router-dom";
import EditForm from "./Form";
import useFetch from "../../../hooks/useFetch";
import { Box, Container, Grid } from "@mui/material";

const EditEmployee = () => {
  const params = useParams();
  const { data, isPending } = useFetch(
    `http://localhost:3000/employees/${params.id}`
  );
  return (
    <Box sx={{ marginTop: 5 }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {isPending ? (
            <div>Loading...</div>
          ) : (
            <>
              <Grid item xs={5}></Grid>
              <Grid item xs={2}>
                <EditForm employee={data} />
              </Grid>
              <Grid item xs={5}></Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default EditEmployee;
