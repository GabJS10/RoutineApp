import { useFormik } from "formik";
import Loader from "../components/Loader";
import { updateDataUser } from "../api/users";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../store/userStore";
import { useState } from "react";

function UserPage() {
  const [file, setFile] = useState(null);
  const { email, username, avatar, biography, date_joined } = useUserStore();
  const updateMutation = useMutation({
    mutationFn: updateDataUser,
    onSuccess: (data) => {
      useUserStore.getState().setUserData(data);
      toast.success("Update Success");
    },
  });

  const formik = useFormik({
    initialValues: {
      username: username,
      biography: biography,
      avatar: avatar,
      email: email,
      date_joined: date_joined,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("biography", values.biography);
      //if values.avatar types if file
      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }
      formData.append("email", values.email);
      formData.append("date_joined", values.date_joined);
      updateMutation.mutate(formData);
    },
  });

  const handleFileChange = (event) => {
    const f = event.target.files[0];
    formik.setFieldValue("avatar", f);
    console.log(f);
    if (f) {
      const reader = new FileReader();
      reader.readAsDataURL(f);

      reader.onload = () => {
        setFile(reader.result);
      };
    }
  };

  if (updateMutation.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-base-300">
          <div className="space-y-2 col-span-full lg:col-span-1">
            <p className="font-medium">Profile</p>
            <p className="text-xs">Modify your public information</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                onChange={formik.handleChange}
                value={formik.values.username}
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-zinc-200 bg-base-100"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                value={formik.values.email}
                disabled
                id="email"
                type="text"
                className="w-full rounded-md focus:ring focus:ri focus:ri bg-base-100"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="date-joined" className="text-sm">
                Date joined
              </label>
              <input
                value={formik.values.date_joined.slice(0, 10)}
                disabled
                id="date-joined"
                type="text"
                className="w-full rounded-md focus:ring focus:ri focus:r bg-base-100 "
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">
                Bio
              </label>
              <textarea
                value={formik.values.biography || " "}
                onChange={formik.handleChange}
                id="biography"
                name="biography"
                type="text"
                placeholder=""
                className="w-full h-40 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-zinc-200 bg-base-100"
              ></textarea>
            </div>
            <div className="col-span-full">
              <label htmlFor="bio" className="text-sm">
                Photo
              </label>
              <div className="flex items-center space-x-2">
                <input type="file" name="avatar" onChange={handleFileChange} />
                <img
                  src={
                    file ? file : `http://127.0.0.1:8000${formik.values.avatar}`
                  }
                  alt="img-user"
                  className="w-14 h-14 rounded-full dark:bg-gray-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 hover:ring hover:ri hover:bg-violet-400 border rounded-md text-center"
            >
              Change
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default UserPage;
