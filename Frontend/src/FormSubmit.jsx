import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function FormSubmit() {
  const [nickname, setNick] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState();
  const [photo, setPhoto] = useState();
  const [building, setBuilding] = useState();

  function SubmitInfo() {
    var formData = new FormData();

    formData.append("name_text", name);
    formData.append("nick_text", nickname);
    formData.append("department_text", department);
    formData.append("phone_number", phone);
    formData.append("building_number", building);
    formData.append("room_number", room);
    formData.append("photo", photo);

    axios
      .post("http://127.0.0.1:8000/info/", formData, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.statusText === "Created") {
          toast.success("data successfully uploaded");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.statusText);
      });
  }

  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();

    SubmitInfo();
    navigate("/info");
  }

  return (
    <form onSubmit={Submit} method="post">
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-sm p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-800">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm  grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label>name</label>
                      <input
                        type="text"
                        name="name_text"
                        id="full_name"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label>nickname</label>
                      <input
                        type="text"
                        name="nick_text"
                        id="email"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Al-ridwani"
                        onChange={(e) => setNick(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label>department</label>
                      <input
                        type="text"
                        name="department_text"
                        id="city"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="industrial"
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label>phone number</label>
                      <input
                        type="text"
                        name="phone_number"
                        id="address"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="+966"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label>building number</label>
                      <input
                        type="text"
                        name="building_number"
                        id="city"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="2"
                        onChange={(e) => setBuilding(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>room number</label>
                      <input
                        type="text"
                        name="room_number"
                        id="city"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="121"
                        onChange={(e) => setRoom(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label>photo</label>
                      <input
                        name="photo"
                        accept="image/*"
                        id="flat-button-file"
                        required
                        multiple={false}
                        type="file"
                        className="h-10 border mt-3 py-2 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right pt-3">
                    <div className="inline-flex items-end">
                      <button
                        className="bg-gray-700 hover:bg-gray-800 font-semibold  text-white text-[1rem] py-2 px-4 rounded "
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormSubmit;
