import { NavLink, useLocation } from "react-router-dom";
import Logo from "../atoms/Logo"
import { pagesURL } from "../utilities/constants/PagesURL";

const Footer = () => {

  const token = localStorage.getItem("token") || "";


  const {pathname}=useLocation()

  return (
   <div className={`w-full flex items-center justify-center bg-black ${pathname=='/cart' ? '' : 'xl:absolute lg:absolute md:absolute sm:relative bottom-0'} `}>
     <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col items-start justify-between
     wl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-11/12 mx-auto
     py-12  text-white">
      <Logo />
      <div className="flx flex-col gap-4">
        <p className="text-2xl mb-4">Pages</p>
        <div className="flex flex-col gap-4">
            {pagesURL.map((item) => {
              return (
                <NavLink
                key={item.id}

                  onClick={() => {
                    if (!token) {
                      alert("plase log in");
                    }
                  }}
                  to={item.path}
                  aria-label={`link to go ${item.name} page`}
                >
                  {item.name}
                </NavLink>
              );
            })}
            <NavLink
              onClick={() => {
                if (!token) {
                  alert("plase log in");
                }
              }}
              to="/cart"
            >
              Cart
            </NavLink>
            <NavLink
              className="bg-white text-black px-5 py-4 rounded"
              to="/login"
            >
              {!token ? "Login" : "frazex@info"}
            </NavLink>
          </div>
        
      </div>
    </div>
   </div>
  )
}

export default Footer
