import React from "react";
import { useState, useEffect } from "react";
import Product from "./Product";
import "./Productlist.css";
import { useSelector } from "react-redux";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { Button } from "semantic-ui-react";

function ProductList() {
  const products = useSelector((state) => state.products);

  const [ProductsList, SetProductsList] = useState([]);
  const [Categories, setCategories] = useState([]);

  const getProducts = () => {
    fetch("http://127.0.0.1:8000/getproducts")
      .then((response) => response.json())
      .then((data) => {
        SetProductsList(data);
      });
  };
  const getProductsByRange = (val1, val2) => {
    fetch("http://127.0.0.1:8000/getproducts")
      .then((response) => response.json())
      .then((data) => {
        let ProductByRange = data.filter((product) => {
          if (product.price >= val1 && product.price <= val2) {
            return product;
          }
        });
        console.log(val1);
        console.log(val2);
        console.log(ProductByRange);
        SetProductsList(ProductByRange);
      });
  };

  const getCategories = () => {
    fetch(`http://127.0.0.1:8000/getcategories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  };

  const getProductInCategories = (CatId) => {
    let result = products.filter((product) => {
      if (product.id_categorie === CatId) {
        return product;
      }
    });
    SetProductsList(result);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    $(function () {
      $("#slider-range").slider({
        range: true,
        min: 0,
        max: 200,
        values: [75, 200],
        slide: function (event, ui) {
          $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        },
      });
      $("#amount").val(
        "$" +
          $("#slider-range").slider("values", 0) +
          " - $" +
          $("#slider-range").slider("values", 1)
      );
      // console.log( typeof($("#amount").val(values[0])))
      console.log($("#slider-range").slider("values", 0));
    });
  }, []);

  return (
    <>
      <h2 className="text-center p-3">
        <i>Your Shelf</i>
      </h2>
      <h3 className="text-center p-3">
        <i>View by Categories</i>
      </h3>
      <div className="container">
        <div className="button-cont">
          <button
            onClick={() => {
              getProducts();
            }}
            className=" btn btn-info"
            style={{ backgroundColor: "#312450" }}
          >
            All Books
          </button>
          {Categories.map((cat) => {
            return (
              <button
                key={cat}
                onClick={() => getProductInCategories(cat.id_categorie)}
                className="btn btn-info"
                style={{ backgroundColor: "#312450" }}
              >
                {cat.titre_category}
              </button>
            );
          })}
          ;
        </div>
        <p className="Range">
          <label for="amount">Price range:</label>
          <input
            type="text"
            id="amount"
            readonly
            style={{ border: 0, color: "#f6931f", "font-weight": "bold" }}
          />
        </p>
        <button
          onClick={() => {
            let val1 = $("#slider-range").slider("values", 0);
            let val2 = $("#slider-range").slider("values", 1);
            getProductsByRange(val1, val2);
          }}
          className="btn btn-info byprice"
          style={{ backgroundColor: "#312450", "margin-bottom": "30px" }}
        >
          Select by price
        </button>
        <div id="slider-range"></div>
        <div className="products-list">
          {ProductsList.length === 0 ? (
            <p>
              <b>Products Empty</b>
            </p>
          ) : null}
          <div className="row">
            {ProductsList.map((product) => {
              return (
                <div className="col-3" key={product.id_book}>
                  <Product product={product} showButton={true} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="star">
        <i className="bx bxl-shopify icon"></i> HAPPY SHOPING
        <i className='bx bxs-happy-heart-eyes red'></i></div>
      {/* <div id="slider"></div> */}
    </>
  );
}

export default ProductList;
