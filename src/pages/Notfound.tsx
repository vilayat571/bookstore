import { useLocation } from "react-router-dom";
import SEO from "../SEO/SEOComponent";

const Notfound = () => {
  const { pathname } = useLocation();

  // using h1, strong element because they are good for SEO and accesbility

  return (
    <main className="flex w-full text-center h-screen items-center justify-center">
       <SEO
        title="BookStore | Notfound"
        description="This is the Notfound page of Bookstore company"
        name="Notfound page"
        type="website"
        keywords="book, buy book, your book etc"
      />
      <div className="flex flex-col">
        <h1 className="text-[200px]">404</h1>
        <p className="mt-5 text-lg">
          Ooops, we are sorry. There is not <br /> result for the
          <strong className="text-red-600">{pathname}</strong>
        </p>
      </div>
    </main>
  );
};

export default Notfound;
