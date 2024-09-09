import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { deleteProduct, plusProduct, minusProduct, setTotalPrice } from "../../features/cartSlice";
import { TiPlus, TiMinus } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import './cartPoduct.css';

interface product{
    _id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
}

export default function CartProduct(props: {cartProduct: product}){
    const selectedCurrency = useAppSelector(state => state.currency.currency);
    const dispatch = useAppDispatch();

    const convertedPrice = (price: number): number => {
        switch (selectedCurrency) {
          case 'EUR':
            return (price * 0.90) % 1 === 0? +(price * 0.90).toFixed(0) : +(price * 0.90).toFixed(2);
          case 'UAH':
            return (price * 41) % 1 === 0? +(price * 41).toFixed(0) : +(price * 41).toFixed(2);
          default:
            return price % 1 === 0? +price.toFixed(0) : +price.toFixed(2);
        }
    };

    function deletePrd(){
        dispatch(deleteProduct(props.cartProduct));
        dispatch(setTotalPrice(selectedCurrency));
    }

    function plusItem(){
        dispatch(plusProduct(props.cartProduct));
        dispatch(setTotalPrice(selectedCurrency));
    }

    function minusItem(){
        if(props.cartProduct.quantity === 1){
            deletePrd();
        }else{
          dispatch(minusProduct(props.cartProduct));
          dispatch(setTotalPrice(selectedCurrency));
        }
    }

    return(
        <div className="cart-product-block">
            <img src={props.cartProduct.image} alt="product image" width="150" height="200"></img>
            <div>
                <div className="cart-product-block_title"> {props.cartProduct.title} </div>
                <div className="cart-product-block_price"> {convertedPrice(props.cartProduct.price) * props.cartProduct.quantity} {selectedCurrency} </div>    
            </div>
            <section className="cart-product-block_counter">
                <button onClick={minusItem} className="cart-product-block_counter_button"> <TiMinus/> </button>
                <div className="cart-product-block_counter_number"> {props.cartProduct.quantity} </div>
                <button onClick={plusItem} className="cart-product-block_counter_button"> <TiPlus/> </button>
            </section>
            <button onClick={deletePrd} className="cart-product-block_delete_button"> <RiDeleteBin6Fill/> </button>
        </div>
    );
}