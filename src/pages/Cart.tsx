import { NavLink } from "react-router-dom";
import Layout from "../layout/Layout";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { IProductProps } from "./ProductPage";
import SEO from "../SEO/SEOComponent";
import { clearCart } from "../redux/reducers/addToCartSlice";

const Cart = () => {
  const productsCart = useAppSelector((state) => state.addToCartSlice.productsCart);


  const dispatch = useAppDispatch();

  const clearCartFNC = () => {
    const survey = confirm(
      "Do you want to really clear the data in the basket"
    );
    if (survey) {
      dispatch(dispatch(clearCart()));
    } else {
      return null;
    }
  };

  const price = productsCart.reduce((total, item) => (total = total + item.price), 0);

  return (
    <Layout>
      <SEO
        title={`BookStore | User Cart`}
        description={"User Cart of BookStore"}
        name="User Cart"
        type="website"
        keywords="book, buy book, your book etc"
      />
      <p className="text-3xl mb-12">This is your basket</p>
      <div
        className={
          productsCart.length > 0
            ? "grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4"
            : "h-[600px]"
        }
      >
        {productsCart && productsCart.length > 0 ? (
          productsCart.map((item: IProductProps) => (
            <div key={item.id} className="col-span-1 w-[300px]">
              <img
                src={item.mainImage}
                className="h-[200px] w-full rounded object-cover mb-3"
                alt={`The image of the product called ${item.title}`}
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
                Go back
              </NavLink>
            </div>
          ))
        ) : (
          <p className="text-gray-500">There is no data</p>
        )}
      </div>
    <div className="flex flex-col gap-6 my-8">
    {productsCart && productsCart.length > 0 && (
        <span>Total price: {price}</span>
      )}

      {productsCart && productsCart.length > 0 && (
        <button
          onClick={() => clearCartFNC()}
          className="bg-black hover:bg-red-500  px-5 py-5 mx-auto w-1/5 transition duration-30  rounded text-white"
        >
          Clear Cart
        </button>
      )}
    </div>
    </Layout>
  );
};

export default Cart;
