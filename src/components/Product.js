import React from "react";
import { Link } from "react-router-dom";
import './product.css'
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../rtk/slices/products-slice';
import { useEffect } from 'react';


function Product(props) {

    const { product, showButton } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    },[])

    const buttonimplement = (showButton) => {
        if (showButton) {
            return (<Link  style={{ backgroundColor: "#312450" }} className="btn btn-primary" key={product.id_book} to={`/products/${product.titre}`}>Details <i className='bx bxs-book-reader'></i> </Link>)
        }
    }

    return (
        <>
            <div className="card book">
                {/* <img src="http://127.0.0.1:5500/reactproject1/my-app/src/components/react%20images/Lacoste.png" className="card-img-top" alt={product.titre} /> */}
                {/* <img src={`http://127.0.0.1:5500/reactproject1/my-app/src/components/react%20images/${product.img}`} className="card-img-top" alt={product.titre} /> */}
                <img src={`http://127.0.0.1:8080/${product.img}`} className="card-img-top" alt={product.titre} /> 
                <div className="card-body book-caption">
                    <h5 className="card-title">{product.titre}</h5>
                    <p className="card-text">{product.description}</p>
                    <p>Price : {product.price}$</p>
                    {
                        buttonimplement(showButton)
                    }
                </div>
            </div>
        </>
    );
}

export default Product;