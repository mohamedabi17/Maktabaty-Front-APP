import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// import withReactContent from 'sweetalert2-react-content'
// import Editproduct from "./Editproduct";
import "./producttable.css";




function Users() {
  const api_url = "http://127.0.0.1:8000/users";
  const [users, setUsers] = useState([]);
  //   const products = useSelector((state) => state.products);
  //   const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/users")
      .then((response) => setUsers(response.data));
  }, []);

  const deleteproductt = (product) => {
    Swal.fire({
      title: `Are You Sure To an Order ${product.titre} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        axios
          .delete(`${api_url}/${product.id_book}`)
          .then((res) => {
            console.log("book deleted");
            // dispatch(fetchProducts());
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  return (
    <>
      <h1 id="text">
        <i>
          <b>Users</b>
        </i>
      </h1>
      {/* <Link to="/add" id="add" className="btn btn-success mt-3 mb-3">
        Add New Book to store<span className="material-symbols-outlined">add</span>
      </Link> */}
      <div className="container">
        <div className="col-10 cont">
          <table className="table table-striped mt-5 table-dark">
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
                <th>first_name</th>
                <th>last_name</th>
                <th>View Commandes</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td className="text">{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      <Link
                        style={{ backgroundColor: "#312450" }}
                        className="btn btn-primary"
                        key={user.id}
                        to={`/users/${user.id}`}
                      >
                        Commandes <i className="bx bxs-book-reader"></i>{" "}
                      </Link>
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

export default Users;
