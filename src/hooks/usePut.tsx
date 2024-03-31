import { useState } from "react";
import { Employee } from "../types";

const useUpdateEmployee = (url: string) => {
  const [error, setError] = useState<string | null>(null);

  const updateEmployee = async (id: string, employeeData: Employee) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  return { updateEmployee, error };
};

export default useUpdateEmployee;
