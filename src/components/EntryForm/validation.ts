import * as yup from "yup";

export const validationSchema= yup.object().shape({
    employeeCode: yup.string().required("Employee Code is required"),
    employeeName: yup.string().required("Employee Name is required"),
    salaryStatus: yup.string().required("Salary status is required"),
    salaryValue: yup.number().required("Salary value is required"),
    hireDate: yup.date().required("Hire Date is required"),
    jobCode: yup.string().required("Job Code is required"),
});




