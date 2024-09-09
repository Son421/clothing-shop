import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { addProduct, setTotalPrice } from "../../features/cartSlice";
import './poductList.css';

interface product{
    _id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export default function Product(props: {product: product}){
    const selectedCurrency = useAppSelector(state => state.currency.currency);
    const dispatch = useAppDispatch();

    function addPr(){
      const newProduct = {...props.product, quantity: 1};
      dispatch(addProduct(newProduct));
      dispatch(setTotalPrice(selectedCurrency));
    }

    const convertedPrice = (price: number): string => {
        switch (selectedCurrency) {
          case 'EUR':
            return (price * 0.90) % 1 === 0? (price * 0.90).toFixed(0) : (price * 0.90).toFixed(2);
          case 'UAH':
            return (price * 41) % 1 === 0? (price * 41).toFixed(0) : (price * 41).toFixed(2);
          default:
            return price % 1 === 0? price.toFixed(0) : price.toFixed(2);
        }
      };

    return(
        <div className="product-block">
            <div className="product-block_image__wrapper">
                <img src={props.product.image} className="product-block_image" alt="product image" width="300" height="350"></img>
            </div>
           <div className="product-block_title"> {props.product.title} </div>
           <div className="product-block_description"> {props.product.description}</div>
           <div className="product-block_price"> {convertedPrice(props.product.price)} {selectedCurrency} </div>
           <button onClick={addPr} className="product-block_button"> Add to cart </button>
        </div>
    );
}