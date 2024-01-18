import { Formik, Form, Field } from "formik";
import Loader from "../components/Loader";
import { CgGym } from "react-icons/cg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/users";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useUserStore } from "../store/userStore";
import { jwtDecode } from "jwt-decode";
function LoginPage() {
  const navigate = useNavigate();

  const { isAuth } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      useAuthStore.getState().setToken(data.access, data.refresh);
      data = jwtDecode(data.access);
      useUserStore.getState().setUserData(data);
      toast.success("Login Success");
      navigate("/");
    },
    onError: (error) => {
      toast.error("Account does not exist, please register first");
    },
  });

  if (loginMutation.isLoading) {
    return <Loader />;
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <CgGym className="font-bold text-center text-3xl mb-5 ml-auto mr-auto" />
          <h2 className="mt-6 text-center text-2xl text-grey">
            Welcome to Routine
          </h2>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => loginMutation.mutate(values)}
            >
              <Form>
                <div className="px-5 py-7">
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    E-mail
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-mail"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-zinc-950"
                  />
                  <label className="font-semibold text-sm text-gray-600 pb-1 block">
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full text-zinc-950"
                  />
                  <button
                    type="submit"
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                  >
                    <span className="inline-block mr-2">Login</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
                <div className="py-5">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-center sm:text-left whitespace-nowrap">
                      <Link
                        to={"/register"}
                        className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-4 h-4 inline-block align-text-top"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="inline-block ml-1">
                          Dont have an account?
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
