import { useLocation } from "react-router-dom";

const Notfound = () => {
  const { pathname } = useLocation();

  // using h1, strong element because they are good for SEO and accesbility

  return (
    <main className="flex w-full text-center h-screen items-center justify-center">
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
