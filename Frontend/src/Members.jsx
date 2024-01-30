import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import SpinnerLoader from "./SpinnerLoad";
import toast from "react-hot-toast";
import { redirect } from "react-router-dom";

function Members() {
  const [info, setInfo] = useState([]);

  function HandleInfo() {
    axios
      .get(`http://127.0.0.1:8000/info/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        toast.error(error.response.statusText);
      });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      HandleInfo();
    }, 1000);
    return () => clearTimeout(timer);
  });

  async function deleteInf(id, el) {
    return await axios
      .delete(`http://127.0.0.1:8000/info/${id}`, {
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        data: el,
      })
      .then((response) => {
        if (response.status === 204) {
          toast.success("data deleted");
        }
      })
      .catch((error) => {
        toast.error(error.response.statusText);
      });
  }

  const navigate = useNavigate();
  function deleteInfo(id, el) {
    deleteInf(id, el);
  }

  function goForm(id, el) {
    navigate("/edit", { state: { id, el } });
  }

  if (info === "") {
    return redirect("/register");
  }

  return (
    <div className="h-screen">
      <div>
        {!info ? (
          <SpinnerLoader />
        ) : (
          <section className="container my-12 mx-auto p-0 sm:p-6 font-mono ">
            <div className="w-full mb-8 overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-bold tracking-wide text-left text-gray-900 bg-gray-50 uppercase border-b border-gray-600">
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3"> Building/room</th>
                      <th className="px-4 py-3">Department</th>
                    </tr>
                  </thead>

                  {info?.map((el, id) => (
                    <tbody className="bg-white" key={id}>
                      <tr className="text-gray-700">
                        <td className="px-4 py-3 border">
                          <div className="flex items-center text-sm">
                            <div className="relative w-8 h-8 mr-3 rounded-full">
                              <img
                                className="object-cover w-full h-full rounded-full"
                                src={"http://127.0.0.1:8000" + el?.photo}
                              />

                              <div
                                className="absolute inset-0 rounded-full shadow-inner"
                                aria-hidden="true"
                              ></div>
                            </div>
                            <div>
                              <p className="font-semibold">{el.name_text}</p>
                              <p className="text-xs text-gray-600">
                                {el.nick_text}
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
                            {el.department_text}
                            <DeleteForeverOutlinedIcon
                              onClick={() => deleteInfo(el.id, el)}
                            />

                            <EditOutlinedIcon
                              onClick={() => goForm(el.id, el)}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Members;
