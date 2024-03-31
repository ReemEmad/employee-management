import { useParams } from "react-router-dom";
import EditForm from "./Form";
import useFetch from "../../../hooks/useFetch";

const EditEmployee = () => {
  const params = useParams();
  const { data, isPending } = useFetch(
    `http://localhost:3000/employees/${params.id}`
  );
  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Edit {data && data.employeeName}'s info</div>
          <EditForm employee={data} />
        </>
      )}
    </>
  );
};

export default EditEmployee;
