import Layout from "../layout/Layout";
import { useParams } from "react-router-dom";
import useFetchData from "../utilities/hooks/useFetchData";
import { IProductProps } from "./ProductPage";
import { useAppDispatch } from "../redux/store/store";
import { addToCart } from "../redux/reducers/addToCartSlice";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const SingleProduct = () => {
  const { id } = useParams();

  // Fetch product details
  const productsData = useFetchData(`/product/details?productId=${id}`);
  const singleProduct: IProductProps | null = productsData?.result;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token") || "";

  const [disable, setDisable] = useState(false);

  const handleAddToCart = (product: IProductProps) => {
    if (token) {
      dispatch(addToCart(product)); // Dispatch the action to add the product to the cart
      toast(`Succesfully added ${product.title} book`, {
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
      setDisable(true);
    } else {
      toast("You have to log in to add a product ", {
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
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2">
        {productsData != null && (
          <>
            <img
              src={singleProduct?.mainImage}
              className="col-span-1 w-[400px] h-[400px] object-cover rounded"
              alt={`the image of the ${singleProduct?.title} book`}
            />
            <div className="col-span-1 flex flex-col">
              <h1 className="text-2xl font-bold">{singleProduct?.title}</h1>
              <p className="mt-2">{singleProduct?.subtitleShort}</p>
              <p className="mt-4">Price: ${singleProduct?.price}</p>
              <button
                disabled={disable}
                onClick={() => handleAddToCart(singleProduct)}
                className={`${
                  disable ? "bg-gray-400" : "bg-black"
                } transition duration-200 block text-center hover:bg-green-600 text-white px-6 py-4 mt-4 rounded`}
              >
                {disable ? "Product was added" : "Add to cart"}
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default SingleProduct;
