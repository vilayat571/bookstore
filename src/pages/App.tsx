import Layout from "../layout/Layout";
import book from "../assets/images/book.png";
import SEO from "../SEO/SEOComponent";

const App = () => {
  const token = localStorage.getItem("token") || "";

  return (
    <Layout>
         <SEO
        title={`BookStore | Home`}
        description={'Home page of BookStore'}
        name="Home page"
        type="website"
        keywords="book, buy book, your book etc"
      />

      <main className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 w-full   relative 
      
      xl:top-20 lg:top-20 md:top-0 sm:top-0
      ">
        <div className="col-span-1 flex flex-col xl:py-12 lg:py-12 md:py-0 sm:py-0 mb-6 justify-start border">
          <h1 className="text-3xl">
            <span>Happy Reading</span>
            <br />
            Dear{" "}
            {token ? (
              <span className="bg-black rounded p-1 text-white text-sm">
                frazex@info{" "}
              </span>
            ) : (
              "user"
            )}{" "}
            😊
          </h1>
          <p className="text-green-800 mt-6 text-2xl w-2/3">
            In Book Store you can find some books to read and also buy. But for
            this you have to be registered user. Please register{" "}
          </p>
          <button className="bg-black w-1/3 rounded mt-5 py-5 px-3 text-white">
            Login
          </button>
        </div>

        <div>
          <img src={book} alt="book image" />
        </div>
      </main>
    </Layout>
  );
};

export default App;
