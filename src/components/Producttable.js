import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./producttable.css";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
} from "../rtk/slices/products-slice";

function Producttable() {
  const api_url = "http://127.0.0.1:8000/products";
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const deleteproductt = (product) => {
    Swal.fire({
      title: `Are You Sure To Delete ${product.titre} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`${api_url}/${product.id_book}`)
          .then((res) => {
            console.log("book deleted");
            dispatch(fetchProducts());
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <h1 id="text"><i><b>Book Store</b></i></h1>
      <Link to="/add" id="add">
        <button className="btn btn-dark mt-3 mb-3"> Add New Book to store<span className="material-symbols-outlined">add</span></button>
      </Link>
      <div className="container">
        <div className="col-10 cont">
          <table className="table table-striped mt-5 table-dark">
            <thead>
              <tr>
                <th>Image</th>
                <th>Id</th>
                <th>Title</th>
                <th>Price</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody >
              {products.map((product) => {
                const productPicture = product
                  ? `http://127.0.0.1:8080/${product.img}`
                  : `placeHolderUrl`;
                return (
                  <tr key={product.id_book}>
                    <td className="img">
                      <img
                        src={productPicture}
                        className="card-img-top"
                        alt={product?.titre}
                      />
                    </td>
                    <td>{product.id_book}</td>
                    <td className="text">{product.titre}</td>
                    <td>{product.price}</td>
                    <td className="text">{product.description}</td>
                    <td className="action">
                      <span className="material-symbols-outlined">
                        <Link
                          className="lien"
                          onClick={() => deleteproductt(product)}
                        >
                          Delete
                        </Link>
                      </span>
                      <div>Delete</div>
                      <span className="material-symbols-outlined">
                        <Link
                          className="lien danger"
                          to={`/products/${product.titre}`}
                        >
                          search
                        </Link>
                      </span>
                      <div>View</div>
                      <span className="material-symbols-outlined">
                        <Link
                          className="lien"
                          to={`/categories/edit/${product.id_book}`}
                        >
                          edit
                        </Link>
                      </span>
                      <div>Edit</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  // onClick={<Editproduct product={product} />}
}

export default Producttable;
