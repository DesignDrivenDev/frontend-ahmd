import {
  deleteProduct,
  getProducts,
} from "@/app/features/products/productsSlice";
import Modal from "@/components/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [checkedData, setCheckedData] = useState("");
  const dispatch = useDispatch();
  const { products, loading, error, searchProducts } = useSelector(
    (state) => state.products
  );

  console.log(products, "productsSlice");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.log(error, "products");
    return <div>Something went wrong!</div>;
  }
  if (!products) return <div>No Products</div>;

  return (
    <div>
      <h1 className="text-xl font-bold pb-3">Product List</h1>
      {/* <div className="flex items-center gap-2 pb-4">
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="all"
            value=""
            checked={checkedData === ""}
            onChange={(e) => setCheckedData(e.target.value)}
          />
          <label htmlFor="all">All</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="male"
            value="Male"
            checked={checkedData === "Male"}
            onChange={(e) => setCheckedData(e.target.value)}
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="female"
            value="Female"
            checked={checkedData === "Female"}
            onChange={(e) => setCheckedData(e.target.value)}
          />
          <label htmlFor="female">Female</label>
        </div>
      </div> */}
      <div>
        {products.length > 0 ? (
          products
            .filter((product) =>
              searchProducts.length === 0
                ? product
                : product.name
                    .toLowerCase()
                    .includes(searchProducts.toLowerCase())
            )
            .filter((product) =>
              checkedData ? product.gender === checkedData : product
            )
            .map((product) => (
              <div
                className="flex flex-wrap justify-between items-center border border-gray-400 p-2 mb-2 gap-2"
                key={product._id}
              >
                <Link
                  href={`/products/${product._id}`}
                  className="font-semibold hover:underline"
                >
                  {product.title}
                </Link>
                <p>{product.brand}</p>
                <p>{product.category}</p>

                <button
                  onClick={() => setModalOpen(true)}
                  className="font-semibold text-sm"
                >
                  View
                </button>
                <Link
                  href={`/products/${product._id}`}
                  className="text-blue-800"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteProduct(product._id))}
                  className="text-red-400"
                >
                  Delete
                </button>
                <Modal
                  isOpen={isModalOpen}
                  closeModal={() => setModalOpen(false)}
                  title="My Modal"
                >
                  <div>Hello world</div>
                </Modal>
              </div>
            ))
        ) : (
          <div className="text-black">mfmsngsnfdgnfdng</div>
        )}
      </div>
    </div>
  );
};

export default Products;
