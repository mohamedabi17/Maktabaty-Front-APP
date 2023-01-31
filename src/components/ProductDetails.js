import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./productdetails.css";
import { addToCart } from "../rtk/slices/Cart-Slice";
import { useDispatch, useSelector } from "react-redux";


function ProductDetails() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [pro, setProduct] = useState(undefined);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  function handleclick(pro) {
    dispatch(addToCart(pro));
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        setError(false);
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/getproducts");
        const data = await response.json();
        const product = data?.find((d) => d.titre === params.productId);
        setProduct(product);
        console.log(params.productId);
        console.log(params);
      } catch (e) {
        console.error("fetch product error", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    <div>error</div>;
  }

  const productPicture = pro
    ? `http://127.0.0.1:8080/${pro.img}`
    : `placeHolderUrl`;

  return (
    <div
      className="card card mb-3"
      style={{
        width: "540px",
        "margin-left": "20%",
      }}
    >
      {pro && (
        <>
          <img src={productPicture} className="detail-image" alt={pro?.titre} />
          <div className="card-body caption">
            <h5 className="card-title book-name">{pro.titre}</h5>
            <p className="card-title desc">{pro.description}</p>
            <p className="card-title desc">by : <i><b>{pro.author}</b></i></p>
            <p className="price">
              {pro.price}$ <span className="discount">{pro.price + 10}$</span>
            </p>
            {/* <Button variant="primary" onClick={() => pro ? handleclick(pro) : null}>Add To Cart</Button> */}
            <div className="page-wrapper">
              <button
                id="addtocart"
                onClick={() => (pro ? handleclick(pro) : null)}
                className={cart.length === 0 ? "nosend" : "sendtocart"}
              >
                Add to Cart
                <span className="cart-item"></span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
