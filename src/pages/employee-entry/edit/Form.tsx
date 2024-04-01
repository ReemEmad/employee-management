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
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="employeeCode"
          control={control}
          render={({ field }) => <TextField label="Employee Code" {...field} />}
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
            <TextField id="standard-basic" label="Employee Name" {...field} />
          )}
        />
        {errors.employeeName && <p>{errors.employeeName.message}</p>}

        <Controller
          name="hireDate"
          control={control}
          render={({ field }) => (
            <TextField label="Hire Date" fullWidth {...field} type="date" />
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
          render={({ field }) => <TextField label="Salary Status" {...field} />}
        />
        {errors.salaryStatus && (
          <Typography variant="body1" color="error">
            {errors.salaryStatus.message}
          </Typography>
        )}

        <Controller
          name="salaryValue"
          control={control}
          render={({ field }) => <TextField label="Salary $" {...field} />}
        />
        {errors.salaryValue && (
          <Typography variant="body1" color="error">
            {errors.salaryValue.message}
          </Typography>
        )}

        <Controller
          name="jobCode"
          control={control}
          render={({ field }) => <TextField label="Job Code" {...field} />}
        />
        {errors.jobCode && (
          <Typography variant="body1" color="error">
            {errors.jobCode.message}
          </Typography>
        )}
      </Stack>
      <Button
        type="submit"
        variant="contained"
        disabled={!isDirty}
        sx={{ marginTop: 2 }}
        fullWidth
      >
        Edit
      </Button>
    </Box>
  );
};

export default EditForm;
