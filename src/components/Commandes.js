import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// import withReactContent from 'sweetalert2-react-content'
// import Editproduct from "./Editproduct";
import "./producttable.css";

function Commandes() {
  const api_url = "http://127.0.0.1:8000/Commandes";
  const [commandes, setCommandes] = useState([]);
  const [etat, setEtat] = useState("");
  //   const products = useSelector((state) => state.products);
  //   const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/Commandes")
      .then((response) => setCommandes(response.data));
  }, []);

  const EditCommande = (Command) => {
    let cmd = {
      id_commande: Command.id_commande,
      Commande_price: Command.Commande_price,
      id_paiment: Command.id_paiment,
      id_user: Command.id_user,
      nbr_produit: Command.nbr_produit,
      etat: etat,
    };
    console.log(cmd);

    axios
      .put(`${api_url}/${Command.id_commande}`, cmd)
      .then((res) => {
        Swal.fire("Good job!", "You command is Edited!", "success");
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteOrder = (commande) => {
    Swal.fire({
      title: `Are You Sure To Delete an Order number ${commande.id_commande} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`${api_url}/${commande.id_commande}`)
          .then((res) => {
            console.log("Order deleted");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <h1 id="text">Orders Panel </h1>
      {/* <Link to="/add" id="add" className="btn btn-success mt-3 mb-3">
        Add New Book to store<span className="material-symbols-outlined">add</span>
      </Link> */}
      <div className="container">
        <div className="col-10 cont">
          <table className="table table-striped mt-5 table-dark">
            <thead>
              <tr>
                <th>id_commande</th>
                <th>Commande_price</th>
                <th>id_paiment</th>
                <th>id_user</th>
                <th>nbr_produit</th>
                <th>Creation Time </th>
                <th>Update Time</th>
                <th>Etat</th>
                <th>Edit</th>
              </tr>
            </thead>

            <tbody>
              {commandes.map((commande) => {
                return (
                  <tr key={commande.id_commande}>
                    <td>{commande.id_commande}</td>
                    <td>{commande.Commande_price}</td>
                    <td className="text">{commande.id_paiment}$</td>
                    <td>{commande.id_user}</td>
                    <td className="text">{commande.nbr_produit}</td>
                    <td className="text">{commande.created_at}</td>
                    <td className="text">
                      {commande.updated_at.slice(0, 10)}{" "}
                      {commande.updated_at.slice(11, 19)}
                    </td>
                    <td>
                      <select
                        id="procategorie"
                        name="id_categorie"
                        onChange={(e) => {
                          setEtat(e.target.value);
                          console.log(parseInt(e.target.value));
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="served">Served</option>
                        <option selected value="ready">
                          Ready
                        </option>
                      </select>
                    </td>
                    <td>
                      <button type="button" className="btn btn-primary btt"  onClick={() => EditCommande(commande)}>
                      <i className='bx bxs-edit-alt'>Edit</i>
                      </button>
                      <button type="button" className="btn btn-danger btt"  onClick={() => deleteOrder(commande)}>
                      <i className='bx bxs-message-rounded-x'>Delete</i>
                      </button>
                      <button type="button" className="btn btn-light btt"  onClick={() => EditCommande(commande)}>
                      <i className='bx bx-search'>View</i>
                      </button>
                      {/* <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteOrder(commande)}
                      >Delete</button> */}
                      {/* <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => deleteOrder(commande)}
                      >View</button> */}
                    </td>
                    {/* <td className="action">
                      <span className="material-symbols-outlined">
                        <button
                          className="btn btn-primary"
                          onClick={() => EditCommande(commande)}
                        ></button>
                      </span>
                      <div>Delete</div>
                      <span className="material-symbols-outlined">
                        <Link
                          className="lien danger"
                          //   to={`/products/${commande.titre}`}
                        >
                          search
                        </Link>
                      </span>
                      <div>View</div>
                      <span className="material-symbols-outlined">
                        <Link
                          className="lien"
                          //   to={`/categories/edit/${product.id_book}`}
                        >
                          edit
                        </Link>
                      </span>
                      <div>Edit</div>
                    </td> */}
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

export default Commandes;
