import React from 'react'
import { TextField, Box } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import './index.css';

interface IFormInputs {
    employeeCode: string;
    employeeName: string;
    salaryStatus: string;
    salaryValue: number;
    hireDate: Date;
    jobCode: string;
}

interface FormProps {
    onSubmitForm: (data:IFormInputs) => void
}

const EntryForm: React.FC<FormProps> = ({ onSubmitForm }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<IFormInputs>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
          employeeCode: "",
          employeeName: "",
          salaryStatus: "",
          salaryValue: 0,
          hireDate: new Date(),
          jobCode: "",
        },
      });
      const onSubmit: SubmitHandler<IFormInputs> = (data) => onSubmitForm(data);
  return (
    <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        
        <Controller
          name="employeeCode"
          control={control}
          render={({ field }) => <TextField label="employeeCode" {...field} />}
        />
        {errors.employeeCode && <p>{errors.employeeCode.message}</p>}

        <Controller
          name="employeeName"
          control={control}
          render={({ field }) => <TextField label="employeeName" {...field} />}
        />
        {errors.employeeName && <p>{errors.employeeName.message}</p>}

        <Controller
          name="hireDate"
          control={control}
          render={({ field }) => <TextField label="hireDate" {...field} />}
          />
        {errors.hireDate && <p>{errors.hireDate.message}</p>}

        <Controller
          name="salaryStatus"
          control={control}
          render={({ field }) => <TextField label="salaryStatus" {...field} />}
          />
        {errors.salaryStatus && <p>{errors.salaryStatus.message}</p>}
        
        <Controller
          name="salaryValue"
          control={control}
          render={({ field }) => <TextField label="salary value" {...field} />}
          />
        {errors.salaryValue && <p>{errors.salaryValue.message}</p>}

        <Controller
          name="jobCode"
          control={control}
          render={({ field }) => <TextField label="job code" {...field} />}
          />
        {errors.jobCode && <p>{errors.jobCode.message}</p>}

        <input type="submit" />
      </Box>
  )
}

export default EntryForm