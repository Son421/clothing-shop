import React, {useState} from 'react';
import { TiArrowSortedUp } from "react-icons/ti";
import { useAppDispatch } from '../../hooks/hooks';
import { setCurrency } from '../../features/currencySlice';
import { setTotalPrice } from '../../features/cartSlice';
import './menu.css'

export default function Menu(props){
    const [shownMenu, setShownMenu] = useState(false);
    const dispatch = useAppDispatch()

    function showMenu(){
        setShownMenu(!shownMenu);
    }

    function setUsd(){
        dispatch(setCurrency('USD'));
        dispatch(setTotalPrice('USD'));
    }

    function setEur(){
        dispatch(setCurrency('EUR'));
        dispatch(setTotalPrice('EUR'));
    }

    function setUah(){
        dispatch(setCurrency('UAH'));
        dispatch(setTotalPrice('UAH'));
    }

    if(!shownMenu){
        return(
            <div className='menu'>
                <button onClick={showMenu} className='menu_button'> Select Currency <TiArrowSortedUp className='menu--clouse' /> </button>
            </div>
        )
    }else{
        return(
            <div className='menu'>
                <button onClick={showMenu} className='menu_button menu_button_active'> Select Currency <TiArrowSortedUp className='menu--open'/> </button>
                <button className='menu_button menu_option' onClick={setUsd}> USD </button>
                <button className='menu_button menu_option' onClick={setEur}> EUR </button>
                <button className='menu_button menu_option' onClick={setUah}> UAH </button>
            </div>
        )
    }
    
}