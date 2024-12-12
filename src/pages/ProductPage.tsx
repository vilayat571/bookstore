import { useCallback, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { NavLink } from "react-router-dom";
import useFetchData from "../utilities/hooks/useFetchData";
import SEO from "../SEO/SEOComponent";

export interface IProductProps {
  id: string;
  mainImage: string;
  numOfLikes: number;
  price: number;
  subtitleShort: string;
  title: string;
}

const ProductPage = () => {
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<IProductProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token") || "";

  const uri = import.meta.env.VITE_API_URL;

  // throttle function I got from internet
  function throttle<T extends (...args: any[]) => unknown>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let lastFunc: ReturnType<typeof setTimeout> | undefined;
    let lastRan: number | undefined;

    return (...args: Parameters<T>) => {
      if (!lastRan) {
        func(...args);
        lastRan = Date.now();
      } else {
        if (lastFunc) clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan! >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan!));
      }
    };
  }

  const productsData = useFetchData("/product/explore");

  useEffect(() => {
    if (productsData) {
      setProducts(productsData.products || []);
    }
  }, [productsData]);

  const searchProducts = useCallback(
    throttle((searchTerm: string) => {
      setLoading(true); // Set loading to true before making the request
      if (searchTerm.trim() === "") {
        setProducts([]);
        setLoading(false); // Stop loading if search term is empty
        return;
      }

      const url = `${uri}/product/search?q=${searchTerm}`;

      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result.products) {
            setProducts(data.result.products);
          }
          setLoading(false); // Stop loading after fetching data
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setLoading(false); // Stop loading if there's an error
        });
    }, 500), // Throttle limit set to 500ms
    [token]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    searchProducts(searchTerm);
  };

  return (
    <Layout>
      <SEO
        title={`BookStore | Products`}
        description="This is the Products page of Bookstore company"
        name="Products page"
        type="website"
        keywords="book, buy book, your book etc"
      />

      <div className="flex w-full flex-col items-center">
        <form className="xl:w-1/2 lg:w-1/2 md:w-4/5 sm:w-11/12 mx-auto mt-12">
          <input
            type="search"
            value={query}
            placeholder="Enter a keyword..."
            onChange={handleSearchChange}
            className="px-4 indent-3 py-5 h-16 border-[1px] border-[#c8c8c8] w-full rounded"
          />
        </form>

        <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 border mt-12 w-full">
          {products != null &&
            products.length > 0 &&
            (!loading ? (
              products.map((item: IProductProps) => (
                <div key={item.id} className="col-span-1 w-[300px]">
                  <img
                    src={item.mainImage}
                    className="h-[200px] w-full rounded object-cover mb-3"
                    alt={`the image of the product called ${item.title}`}
                  />
                  <p className="flex items-center justify-between text-sm mb-3">
                    <span>{item.numOfLikes} ❤️</span>
                    <span>${item.price}</span>
                  </p>
                  <p className="text-lg font-bold">{item.title}</p>
                  <p className="text-lg line-clamp-1">{item.subtitleShort}</p>
                  <NavLink
                    to={`/products/${item.id}`}
                    className="bg-black transition duration-200 block text-center hover:bg-green-600 text-white px-6 py-4 mt-4 rounded"
                  >
                    See Product
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Loading</p>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
