import { Link, NavLink } from "react-router-dom";
import { pagesURL } from "../utilities/constants/PagesURL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppSelector } from "../redux/store/store";

/*
 Some key points
 
1. aria-label essential for the seo and accesibilty
2. using navlink to show active page 
3.
 
 */

const Navbar = () => {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const token = localStorage.getItem("token") || "";

  const productsCart = useAppSelector(
    (state) => state.addToCartSlice.productsCart
  );

  return (
    <nav className="flex  py-8 mb-6 flez items-center justify-between">
      <Link
        aria-label="this is the link to redirect to home page"
        to="/"
        className="text-2xl text-black"
      >
        BookStore
      </Link>

      <div className="xl:flex lg:flex md:hidden sm:hidden">
        {pagesURL.map((item) => {
          return (
            <NavLink
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
      </div>

      <div className="xl:flex lg:flex md:hidden sm:hidden items-center justify-between gap-5">
        <NavLink
         onClick={() => {
          if (!token) {
            alert("plase log in");
          }
        }}
        to="/cart">Cart <sup>{productsCart.length}</sup> </NavLink>
        <NavLink className="bg-black text-white px-5 py-4 rounded" to="/login">
          {!token ? "Login" : "frazex@info"}
        </NavLink>
      </div>

      <FontAwesomeIcon
        onClick={() => setSidebar(!sidebar)}
        icon={faBars}
        className="xl:hidden lg:hidden md:flex sm:flex text-lg px-5 py-4 rounded bg-black text-white"
      />

      {sidebar && (
        <div className="fixed w-full top-0 left-0 h-screen bg-white flex flex-col px-6">
          <div className="flex py-8 justify-between items-center">
            <Link
              aria-label="this is the link to redirect to home page"
              to="/"
              className="text-2xl text-black"
            >
              BookStore
            </Link>
            <FontAwesomeIcon
              onClick={() => setSidebar(!sidebar)}
              icon={faClose}
              className="xl:hidden lg:hidden md:flex sm:flex text-lg px-5 py-4 rounded bg-black text-white"
            />
          </div>
          <div className="flex flex-col gap-4">
            {pagesURL.map((item) => {
              return (
                <NavLink
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
            to="/cart">Cart</NavLink>
            <NavLink
              className="bg-black text-white px-5 py-4 rounded"
              to="/login"
            >
              {!token ? "Login" : "frazex@info"}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
