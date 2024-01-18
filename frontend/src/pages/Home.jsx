import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { jwtDecode } from "jwt-decode";
function Home() {
  const accessToken = useAuthStore.getState().access;

  const is_staff = jwtDecode(accessToken).is_staff;

  return (
    <>
      <div className="flex">
        <div className="w-1/5 bg-gray-200 h-screen">
          <Sidebar is_staff={is_staff} />
        </div>

        <div className="w-3/4 p-4">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
