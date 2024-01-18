import { CgGym } from "react-icons/cg";
import { useUserStore } from "../store/userStore";
function Header() {

  const { avatar, username } = useUserStore();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          
        </div>
        <div className="navbar-center hidden lg:flex">
          <CgGym className="font-bold text-center text-3xl mb-5 ml-auto mr-auto" />
        </div>
        <div className="navbar-end">
          <h3 className="font-bold text-center text-1xl mb-auto ml-auto mr-2.5 mt-auto">Bienvenido {username}</h3>
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src={`http://127.0.0.1:8000${avatar}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
