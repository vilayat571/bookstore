import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SEO from "../SEO/SEOComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import book from "../assets/images/bookstorew.webp"; /* adding webp is the good choice for the performance */
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const [type, setType] = useState<boolean>(false);

  // event delegation - it is applying same function for the different elements for the same process
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  const token = localStorage.getItem("token") || "";

  // applying preventDefault() because of avoiding page refresh
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const uri = "https://bookbuzz.inloya.com/api/v1/account/login";

    fetch(uri, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          // Handle HTTP errors
          throw new Error("Invalid credentials or server error");
        }
        return res.json(); // Parse response body as JSON
      })
      .then((data) => {
        localStorage.setItem("token", data.result.jwt);

        toast("You are welcome", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: "green",
            color: "white",
            fontFamily: "Poppins",
          },
        });
        setForm({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        console.error(`There is an error: ${err}`);
        toast("There is no user with these credentials", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: "red",
            color: "white",
            fontFamily: "Poppins",
          },
        });
      })
      .finally(() => console.log("Promise end"));
  };

  const handleLogout = () => {
    const survey = confirm("Do you want to log out from your profile?");
    if (survey) {
      localStorage.clear();
      toast("Succesfully logged out", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "green",
          color: "white",
          fontFamily: "Poppins",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      return null;
    }
  };

  return (
    <main>
      <ToastContainer />

      <SEO
        title="BookStore | Login"
        description="This is the login page of Bookstore company"
        name="login page"
        type="website"
        keywords="book, buy book, your book etc"
      />

      <FontAwesomeIcon
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 border-[1px] px-5 py-3 hover:text-white rounded border-black hover:bg-black transition duration-200"
        icon={faArrowLeft}
      />

      {token ? (
        <section className="flex items-center justify-center w-full h-screen ">
          <div className="flex-col gap-4  text-center ">
            <p className="text-4xl"> You already logged in 🥳</p>
            <button
              onClick={() => handleLogout()}
              className="border-[1px] border-black hover:border-red-600 text-black hover:bg-red-600 transition duration-300 hover:text-white px-5 py-4 rounded mt-5"
            >
              Log out
            </button>
          </div>
        </section>
      ) : (
        <section className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xl:w-11/12 lg:w-11/12 md:w-full sm:w-full mx-auto">
          <div className="col-span-1 w-full h-screen xl:flex lg:flex md:hidden sm:hidden items-center justify-center">
            <img
              src={book}
              alt="this is the login page image for bookstore" /* adding alt is essential for SEO */
            />
          </div>

          <div className="col-span-1 border flex w-full h-screen flex-col justify-center items-center">
            <h1 className="text-4xl mb-4">Welcome </h1>
            <form
              autoComplete="no" // disabling autcomplete in the form
              className="flex flex-col gap-4 w-full xl:px-20 lg:px-20 md:px-12 sm:px-4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                className="border-[1px] border-[#c8c8c8] w-full h-16 px-5 indent-3 py-3"
                type="email"
                id="email"
                placeholder="Email:"
                onChange={(e) => handleChange(e)}
              />
              <input
                className="border-[1px] border-[#c8c8c8] w-full h-16 px-5 indent-3 py-3"
                type={type ? "text" : "password"}
                id="password"
                placeholder="Password:"
                onChange={(e) => handleChange(e)}
              />

              <button className="bg-black transition duration-300 hover:bg-green-600 text-white px-5 py-6">
                Login
              </button>

              <p className="mt-3">
                <input onClick={() => setType(!type)} type="checkbox" /> Show
                password
              </p>
            </form>
          </div>
        </section>
      )}
    </main>
  );
};

export default Login;
