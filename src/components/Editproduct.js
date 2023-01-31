import React from "react";
import { useState, useEffect } from "react";
import './addproduct.css'
import axios from 'axios'
import { useParams } from "react-router-dom";

function Editproduct() {

    const api_url = "http://localhost:8000/getproducts";
    const params = useParams();

    // const title1 = params.product.title;
    // const price1 = params.product.price;
    // const category1 = params.product.category;

    const [product, setProduct] = useState(params.product);
    const [title, setTitle] = useState(params.product.id);
    const [price, setPrice] = useState(params.product.price);
    const [category, setCategorie] = useState(params.product.category);



    useEffect(() => {
        fetch(`${api_url}/${product}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("from useEffect", res)
                setProduct(res)
            });

    }, []);


    const formSubmit = (e) => {
        e.preventDefault();

        axios.put(`${api_url}/${params.product}`, {
            title,
            price,
            category
        }).then((res) => {
            setProduct(res);
        })

    };



    return (

        <>
            <h1> Edit A Product</h1>
            <form onSubmit={formSubmit}>
                <div className="d-flex align-items-start flex-column mt-5 parent">
                    <div className="container">
                        <div className="col-auto">
                            <label for="protitle" className="col-form-label">¨Product Title</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="protitle" className="form-control" placeholder="Product Title" onChange={((e) => setTitle(e.target.value))} defaultValue={product.title} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="col-auto">
                            <label for="proprice" className="col-form-label">¨Product Price</label>
                        </div>
                        <div className="col-auto">
                            <input type="number" id="proprice" className="form-control" placeholder="Product Price" onChange={((e) => setPrice(e.target.value))} defaultValue={product.price} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="col-auto">
                            <label for="procategorie" className="col-form-label">¨Product Category</label>
                        </div>
                        <div className="col-auto">
                            <input type="text" id="procategorie" className="form-control" placeholder="Product Category" onChange={((e) => setCategorie(e.target.value))} defaultValue={product.category} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Edit Product
                    </button>
                </div>

            </form>
        </>
    );

}

export default Editproduct;