import React from "react";
import generateData, { RemoveImage, deleteInfo } from "../Client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "../SpinnerLoad";

function InfoTable() {
  // const [open, setOpen] = useState(false);
  // Access the client
  const queryClient = useQueryClient();
  const naviagate = useNavigate();
  // Queries
  const query = useQuery({
    queryKey: ["name"],
    queryFn: generateData,
  });

  //Deleting Table//
  const mutation = useMutation({
    mutationFn: (id) => {
      deleteInfo(id);
    },

    onSuccess: () => {
      toast.success("data is successfully deleted");
      naviagate("/form");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["name"] });
    },
    onError: (err) => toast.error(err.message),
  });

  function handlesubmit(id) {
    mutation.mutate(id);
  }

  //Remove Image from the bucket//

  const bucketmutation = useMutation({
    mutationFn: (imagename) => {
      RemoveImage(imagename);
    },

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["name"] });
    },
  });

  function handleRemove(imagename) {
    bucketmutation.mutate(imagename);
  }
  const navigate = useNavigate();
  function goEdit(el) {
    navigate("/edit", { state: { el } });
  }
  console.log(mutation);

  return (
    <div>
      {!mutation.isIdle ? (
        <SpinnerLoader />
      ) : (
        <section className="container my-12 mx-auto p-0 sm:p-6 font-mono ">
          <div className="w-full mb-8 overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-bold tracking-wide text-left text-gray-900 bg-red-300 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3"> Building/room</th>
                    <th className="px-4 py-3">Department</th>
                  </tr>
                </thead>

                {query.data?.map((el) => (
                  <tbody className="bg-white" key={el.id}>
                    <tr className="text-gray-700">
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={el.image}
                              alt=""
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                          <div>
                            <p className="font-semibold">{el.name}</p>
                            <p className="text-xs text-gray-600">
                              {el.nickname}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 border text-md font-semibold">
                        {el.phone_number}
                      </td>
                      <td className="px-4 py-3 border text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight   rounded-sm">
                          {el.building_number}/{el.room_number}
                        </span>
                      </td>
                      <td className="px-4 py-3 border text-sm">
                        <div className="flex gap-3 justify-center items-center">
                          {el.department}
                          <DeleteForeverOutlinedIcon
                            onClick={() => {
                              handlesubmit(el.id);
                              handleRemove(el.image);
                            }}
                            className="bg-red-300"
                          />

                          <EditOutlinedIcon
                            // onClick={() => setOpen((open) => !open)}
                            onClick={() => goEdit(el)}
                            className="bg-red-300"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  // {<EditPage data={el} />}
                ))}
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default InfoTable;
