import { TextField, Typography, Box, List } from "@mui/material";
import EntryForm from "../../components/EntryForm";
import { useEffect, useState } from "react";
import { Employee } from "../../types";
import EmployeeListItem from "../../components/ListItem";
import useFetch from "../../hooks/useFetch";
import useCreateEmployee from "../../hooks/usePost";

export default function EmployeeEntry() {
  const [Employees, setEmployees] = useState<Employee[]>([
    {
      employeeName: "hamada",
      employeeCode: "333d",
      salaryStatus: "valid",
      salaryValue: 95,
      hireDate: new Date(),
      jobCode: "97",
    },
    {
      employeeName: "rehab",
      employeeCode: "333ssd",
      salaryStatus: "valid",
      salaryValue: 95,
      hireDate: new Date(),
      jobCode: "97",
    },
  ]);
  const { data, isPending, error } = useFetch('http://localhost:3000/employees')
  const {createEmployee} = useCreateEmployee('http://localhost:3000/employees')
  console.log("🚀 ~ EmployeeEntry ~ data:", data)

  useEffect(() => {
 if(data!==null){
  console.log(data)
 }
  }, [data]);

  const handleEmployeeClick = (code: string) => {
    console.log(`Employee with code ${code} clicked`);
    // Do something with the employee code
  };

  const addAnEmplpoyee = async (employee:Employee)=>{
    const data = await createEmployee(employee)
    console.log("🚀 ~ addAnEmplpoyee ~ data:", data)
  }

  return (
    <>
      <Typography component="h4" sx={{ mx: "auto", my: "auto" }}>
        Employee Entry Page
      </Typography>
      <EntryForm onSubmitForm={addAnEmplpoyee}/>
      {isPending &&<p>HOLD UP...</p>}
      <List>
        {data && data.map((employee) => (
          <EmployeeListItem
            key={employee.employeeName}
            name={employee.employeeName}
            code={employee.employeeCode}
            onEmployeeClick={handleEmployeeClick}
          />
        ))}
      </List>
    </>
  );
}
