import React from "react";
import { useState } from "react";
import "./addproduct.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";
// import CSRFToken from './csrftoken';
// import insertproduct from '.../api/views.py'

// import { useHistory } from "react-router";

function Addproduct() {
  const api_url = "http://127.0.0.1:8000/products";

  const [titre, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [id_categorie, setCategorie] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [img, setImage] = useState("");

  // const history = useHistory()

  const formSubmit = (e) => {
    e.preventDefault();

    // let formField = new FormData();

    // formField.append("titre": titre);
    // formField.append("author", author);
    // formField.append("description", desc);
    // formField.append("price", price);
    // formField.append("id_categorie", id_categorie);
    // if (img !== null) {
    //     formField.append("img", img);
    // }
    const image = selectedImage.name;
    let book = {
      titre: titre,
      author: author,
      description: desc,
      img: image,
      price: price,
      id_categorie: id_categorie,
    };

    console.log(book);

    axios
      .post(api_url, book)
      .then((res) => {
        Swal.fire("Good job!", "You Book is Added!", "success");
        console.log(res.data);
        this.setState({
          titre: res.data.titre,
          author: res.data.author,
          description: res.data.desc,
          selectedImage: res.data.img,
          id_categorie: res.data.id_categorie,
        });
        // history.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // axios.post(api_url, {
  //     title,
  //     price,
  //     category,
  //     image
  // }).then((res) => { console.log(res) })

  //     fetch(api_url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "Application/json",
  //       },
  //       body: JSON.stringify({
  //         title,
  //         price,
  //         category,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   };

  return (
    <>
      <h1>
        <i className="bx bxs-book-add">Add Book</i>
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
                />
              </div>
            </div>
            <button
              style={{ backgroundColor: "#312450" }}
              type="submit"
              className="btn btn-primary"
            >
              Add Book
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

export default Addproduct;
