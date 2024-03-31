import { useState } from "react";

const useDeleteEmployee = (url: string) => {
  const [error, setError] = useState<string | null>(null);

  const deleteEmployee = async (id: string) => {
    try {
      const response = await fetch(url + id, {
        cache: "no-store",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  return { deleteEmployee, error };
};

export default useDeleteEmployee;
