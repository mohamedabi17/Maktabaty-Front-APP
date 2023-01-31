import React, { useEffect } from "react";
import { useState } from "react";
import "./addproduct.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
// import CSRFToken from './csrftoken';
// import insertproduct from '.../api/views.py'

// import { useHistory } from "react-router";

function Edit() {
  const api_url = "http://127.0.0.1:8000/products";
  const params = useParams();

  const [product, setProduct] = useState({});
  const [Titre, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [Price, setPrice] = useState(0);
  const [Id_categorie, setCategorie] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${api_url}/${params.productId}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();

    const image = selectedImage.name;
    let book = {
      titre: Titre,
      author: Author,
      description: desc,
      img: image,
      price: Price,
      id_categorie: Id_categorie,
    };
    console.log(book);

    axios
      .put(`${api_url}/${params.productId}`, book)
      .then((res) => {
        Swal.fire("Good job!", "You Book is Edited!", "success");
        console.log(res.data);
        this.setState({
          Titre: res.data.titre,
          Author: res.data.author,
          desc: res.data.description,
          Price: res.data.price,
          selectedImage: res.data.img,
          Id_categorie: res.data.id_categorie,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  //   };

  return (
    <>
      <h1>
        <i className="bx bx-edit-alt">Edit Book</i>
      </h1>
      <Container className="addProduct">
        <form className="ProductAdder" onSubmit={formSubmit}>
          {/* <CSRFToken > */}
          <div className="parent">
            <div className="container">
              <div className="col-auto">
                <label for="protitle" className="col-form-label">
                  Title
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  id="protitle"
                  className="form-control"
                  placeholder="Product Title"
                  onChange={(e) => setTitle(e.target.value)}
                  name="titre"
                  defaultValue={product.titre}
                />
              </div>
            </div>
            <div className="container">
              <div className="col-auto">
                <label for="proprice" className="col-form-label">
                  Price
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  id="proprice"
                  className="form-control"
                  placeholder="Product Price"
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  name="price"
                  defaultValue={product.price}
                />
              </div>
            </div>
            <div className="container">
              <div className="col-auto">
                <label for="procategorie" className="col-form-label">
                  Category
                </label>
              </div>
              <div className="col-auto">
                <select
                  id="procategorie"
                  name="id_categorie"
                  onChange={(e) => {
                    setCategorie(parseInt(e.target.value));
                    console.log(parseInt(e.target.value));
                  }}
                  defaultValue={product.id_categorie}
                >
                  <option value="1">1-Programming</option>
                  <option value="2">2-Self Developement</option>
                  <option selected value="3">
                    3-Novels
                  </option>
                </select>
              </div>
            </div>
            <div className="container">
              <div className="col-auto">
                <label for="bookauthor" className="col-form-label">
                  Author
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  id="bookauthor"
                  className="form-control"
                  placeholder="Book Author"
                  onChange={(e) => setAuthor(e.target.value)}
                  name="author"
                  defaultValue={product.author}
                />
              </div>
            </div>
            <div className="container">
              <div className="col-auto">
                <label for="desc" className="col-form-label">
                  Description
                </label>
              </div>
              <div className="col-auto">
                <input
                  type="text"
                  id="desc"
                  className="form-control"
                  placeholder="Description"
                  onChange={(e) => setDesc(e.target.value)}
                  name="Desc"
                  defaultValue={product.description}
                />
              </div>
            </div>
            <div className="container">
              <div className="col-auto">
                <label for="proimage" className="col-form-label">
                  Book Cover Image
                </label>
              </div>
              {/* <div className="col-auto">
              <input
                type="text"
                id="proimage"
                className="form-control form'control-lg"
                placeholder="Book Cover Image"
                onChange={(e) => setImage(e.target.value)}
                name="img"
              />
            </div> */}
              <div>
                <input
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                  defaultValue={product.img}
                />
              </div>
            </div>
            <button
              style={{ backgroundColor: "#312450" }}
              type="submit"
              className="btn btn-primary"
            >
              UPDATE
            </button>
          </div>
          {selectedImage && (
            <div className="imageSelected">
              <img
                alt="not fount"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
              />
              <button
                style={{ backgroundColor: "#312450" }}
                className="btn btn-primary remove"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </button>
            </div>
          )}
        </form>
      </Container>
    </>
  );
}

export default Edit;
