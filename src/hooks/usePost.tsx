import { useState } from 'react';
import { Employee } from '../types';

const useCreateEmployee = ( url:string) => {
  const [error, setError] = useState<string | null>(null);

  const createEmployee = async (employeeData: Employee) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  return { createEmployee, error };
};

export default useCreateEmployee;
