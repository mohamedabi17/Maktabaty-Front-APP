import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./producttable.css";


function Lignes() {
  const [lignes,setLignes]=useState([])



  useEffect(() => {
    axios
    .get("http://127.0.0.1:8000/LignesCommandes")
    .then((response) => setLignes(response.data))
  }, []);


  return (
    <>
      <h1 id="text">LigneCommande Panel </h1>
      <div className="container">
        <div className="col-10 cont">
          <table className="table table-striped mt-5 table-primary">
            <thead>
              <tr>
                <th>id_book</th>
                <th>id_commande</th>
                <th>book_quantity</th>
              </tr>
            </thead>

            <tbody>
              {lignes.map((ligne) => {
                
                return (
                  <tr key={ligne.id_book}>
                    <td>
                      {ligne.id_book}
                      
                    </td>
                    <td>{ligne.id_commande}</td>
                    <td className="text">{ligne.book_quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

}

export default Lignes;