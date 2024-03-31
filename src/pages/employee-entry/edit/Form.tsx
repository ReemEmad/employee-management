import { TextField, Box, Button, Stack, Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker } from "@mui/x-date-pickers";
import { IFormInputs } from "../../../data/form-inputs";
import { validationSchema } from "../../../components/EntryForm/validation";
import Picker from "../../../components/ui/datepicker";
import useUpdateEmployee from "../../../hooks/usePut";
import { Employee } from "../../../types";

const EditForm = ({ employee }: { employee: Employee | Employee[] | null }) => {
  const {
    employeeCode,
    employeeName,
    hireDate,
    salaryStatus,
    salaryValue,
    jobCode,
  } = employee as Employee;
  const { updateEmployee } = useUpdateEmployee(
    `http://localhost:3000/employees`
  );
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<IFormInputs>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      employeeCode,
      employeeName,
      hireDate,
      salaryStatus,
      salaryValue,
      jobCode,
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const { id } = employee;
    updateEmployee(id, data);
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={2}>
        <Controller
          name="employeeCode"
          control={control}
          render={({ field }) => <TextField label="employeeCode" {...field} />}
        />
        {errors.employeeCode && (
          <Typography variant="body1" color="error">
            {errors.employeeCode.message}
          </Typography>
        )}

        <Controller
          name="employeeName"
          control={control}
          render={({ field }) => (
            <TextField id="standard-basic" label="employeeName" {...field} />
          )}
        />
        {errors.employeeName && <p>{errors.employeeName.message}</p>}

        <Controller
          name="hireDate"
          control={control}
          render={({ field }) => (
            <Picker {...field}>
              <DatePicker label="Hire Date" onChange={field.onChange} />
            </Picker>
          )}
        />
        {errors.hireDate && (
          <Typography variant="body1" color="error">
            {errors.hireDate.message}
          </Typography>
        )}

        <Controller
          name="salaryStatus"
          control={control}
          render={({ field }) => <TextField label="salaryStatus" {...field} />}
        />
        {errors.salaryStatus && (
          <Typography variant="body1" color="error">
            {errors.salaryStatus.message}
          </Typography>
        )}

        <Controller
          name="salaryValue"
          control={control}
          render={({ field }) => <TextField label="salary i $" {...field} />}
        />
        {errors.salaryValue && (
          <Typography variant="body1" color="error">
            {errors.salaryValue.message}
          </Typography>
        )}

        <Controller
          name="jobCode"
          control={control}
          render={({ field }) => <TextField label="job code" {...field} />}
        />
        {errors.jobCode && (
          <Typography variant="body1" color="error">
            {errors.jobCode.message}
          </Typography>
        )}
      </Stack>
      <Button type="submit" variant="contained" disabled={!isDirty}>
        Edit
      </Button>
    </Box>
  );
};

export default EditForm;
