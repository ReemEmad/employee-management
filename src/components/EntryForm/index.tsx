import React from "react";
import { TextField, Box, Button, Stack, Grid } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { validationSchema } from "./validation";
import "./index.css";
import { defaultValues } from "./defaults";
import { Employee } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import useCreateEmployee from "../../hooks/usePost";
import { IFormInputs } from "../../data/form-inputs";

interface FormProps {
  maxCode: number | undefined;
}
const EntryForm: React.FC<FormProps> = ({ maxCode }) => {
  const { createEmployee } = useCreateEmployee(
    "http://localhost:3000/employees"
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const addAnEmployee = async (employee: Employee) => {
    validateEmployeeCode();
    await createEmployee(employee);
    reset();
  };

  const validateEmployeeCode = () => {
    if (getValues("employeeCode") === "") {
      const initial = getValues("employeeName")[0];
      setValue("employeeCode", `${initial}00${maxCode!.toString()}`);
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    addAnEmployee(data);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Controller
            name="employeeCode"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="employeeCode" {...field} />
            )}
          />
          {errors.employeeCode && <p>{errors.employeeCode.message}</p>}
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="employeeName"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                id="standard-basic"
                label="employeeName"
                {...field}
              />
            )}
          />
          {errors.employeeName && <p>{errors.employeeName.message}</p>}
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="hireDate"
            control={control}
            render={({ field }) => (
              <TextField label="Hire Date" fullWidth {...field} type="date" />
            )}
          />
          {errors.hireDate && <p>{errors.hireDate.message}</p>}
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="salaryStatus"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="salaryStatus" {...field} />
            )}
          />
          {errors.salaryStatus && <p>{errors.salaryStatus.message}</p>}
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="salaryValue"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="salary value" {...field} />
            )}
          />
          {errors.salaryValue && <p>{errors.salaryValue.message}</p>}
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="jobCode"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label="job code" {...field} />
            )}
          />
          {errors.jobCode && <p>{errors.jobCode.message}</p>}
        </Grid>
        <Grid item xs={3}>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EntryForm;
