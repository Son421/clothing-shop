import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { changePopupVisibility } from "../../features/cartSlice";
import './header.css';

export default function Header(){
    const popupVisibility = useAppSelector(state => state.cartProducts.isPopupOpen)
    const dispatch = useAppDispatch();

    return(
        <div className="header">
            <div>
                <GiClothes/>
                    Clothing store
            </div>
            <button className="header_cart__button" onClick={() => (dispatch(changePopupVisibility()))}> {popupVisibility? <BiArrowBack/> : <FaShoppingCart/>} </button>
        </div>
    );
}