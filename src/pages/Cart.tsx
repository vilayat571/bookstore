import { NavLink } from "react-router-dom";
import Layout from "../layout/Layout";
import { useAppSelector } from "../redux/store/store";
import { IProductProps } from "./ProductPage";

const Cart = () => {
  const productsCart = useAppSelector((state) => state.addToCartSlice.productsCart);

  return (
    <Layout>
      <p>This is your basket</p>
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
              to={`/productsCart/${item.id}`}
              className="bg-black transition duration-200 block text-center hover:bg-green-600 text-white px-6 py-4 mt-4 rounded"
            >
              Go back
            </NavLink>
          </div>
        ))
      ) : (
        <p className="text-gray-500">There is no data</p>
      )}
    </Layout>
  );
};

export default Cart;
