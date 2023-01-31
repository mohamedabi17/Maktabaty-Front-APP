import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../rtk/slices/products-slice";
// import USER_LOADED_SUCCESS from "../rtk/slices/Reducers/auth";

import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import "./cart.css";
import {
  DimQuantityCart,
  AugQuantityCart,
  deleteFromCart,
  clear,
} from "../rtk/slices/Cart-Slice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  var [pay, SetPaiment] = useState(0);
  var [com, setCommande] = useState(0);

  const totalPrice = cart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);

  console.log("totalPrice" + { totalPrice });

  // const createLigne = (book, commande_id) => {
  //   let LigneCommande = {
  //     id_book: book.id_book,
  //     id_commande: commande_id,
  //     book_quantity: book.quantity,
  //   };
  //   axios
  //     .post("http://127.0.0.1:8000/LignesCommandes", LigneCommande)
  //     .then((response) => console.log(response.data));
  // };

  const MakeAnOrder = () => {
    window.open(
      "https://buy.stripe.com/8wMbKt1or9Icd6U7st",
      "_blank",
      "noreferrer"
    );
    const CartTotalPrice = totalPrice;

    const payment = {
      some_paiment: CartTotalPrice,
      id_user: auth.user.id,
    };
    console.log(CartTotalPrice);

    console.log(payment);

    axios
      .post("http://127.0.0.1:8000/Payments", payment)
      .then((response) => SetPaiment(response.data.id_paiment));

    const nbr = cart.length;
    console.log(pay);

    const commande = {
      Commande_price: CartTotalPrice,
      id_paiment: pay,
      id_user: auth.user.id,
      nbr_produit: nbr,
    };

    axios
      .post("http://127.0.0.1:8000/Commandes", commande)
      .then((response) => setCommande(response.data.id_commande));

    console.log(com);
    // map through cart products to send every card product to database as ligneCommande
    cart.map((book) => {
      let LigneCommande = {
        id_book: book.id_book,
        id_commande: com,
        book_quantity: book.quantity,
      };
      axios
        .post("http://127.0.0.1:8000/LignesCommandes", LigneCommande)
        .then((response) => console.log(response.data));
    });

    // make  commande instance call to api
    //get user id
    //command info
    //post commande to api
    // makelignes commandes
    //map through cart products
    //every product in cart is an instance of the lignecommande
    //post lignescommande
    //every lignecommande have userId and CommndId
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <Container className="mt-5">
        <div className="carttt">
          <h1 className="mt-3">
            YOUR CART<i className="bx bxs-cart"></i>
          </h1>
          <h2 className="mt-3" style={{ color: "red" }}>
            Total Price :{totalPrice.toFixed(2)}$
          </h2>
        </div>
        <Table striped>
          <thead>
            <tr>
              <th>title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr>
                <td>{product.titre}</td>
                <td>
                  <img
                    src={`http://127.0.0.1:8080/${product.img}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteFromCart(product))}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(AugQuantityCart(product))}
                  >
                    <i className="bx bx-plus-medical"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(DimQuantityCart(product))}
                  >
                    <i className="bx bx-minus"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="Buttons">
          <Button
            className="mt-3 mb-3"
            variant="primary"
            onClick={() =>
              Swal.fire({
                title: `Are You Sure To Delete All your product from Your Cart ?`,
                showCancelButton: true,
              }).then((data) => {
                if (data.isConfirmed) {
                  dispatch(clear());
                }
              })
            }
          >
            Remove all products<i className="bx bx-cart"></i>
          </Button>
          <Button
            className="mt-3 mb-3"
            variant="primary"
            onClick={() =>
              Swal.fire({
                title: `Are You Sure To Checkout ?`,
                showCancelButton: true,
              }).then((data) => {
                if (data.isConfirmed) {
                  MakeAnOrder();
                }
              })
            }
          >
            Checkout <i className="bx bxs-credit-card"></i>
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Cart;
