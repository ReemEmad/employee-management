import React, { Dispatch, SetStateAction } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { IFormInputs } from "../../data/form-inputs";

const EmployeeFilterForm = ({
  setFilterData,
}: {
  setFilterData: Dispatch<SetStateAction<undefined>>;
}) => {
  const { handleSubmit, control, register } = useForm();

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    setFilterData(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Controller
              name="employeeCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField fullWidth label="Code" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="employeeName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField fullWidth label="Name" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="salaryValue"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField fullWidth label="Salary" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={3} sx={{ mt: 1 }}>
            <FormControlLabel
              control={<Checkbox />}
              label="valid salary"
              {...register("salaryStatus")}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="hireDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField label="Hire Date" fullWidth {...field} type="date" />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="jobCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField fullWidth label="Job Code" {...field} />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EmployeeFilterForm;
