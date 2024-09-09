import React, {useState} from "react";
import './shoppingCartPopup.css';
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { clearCart, setTotalPrice } from "../../features/cartSlice";
import CartProduct from "../../components/cartProduct/CartProduct";
import Menu from "../../components/menu/Menu";
import constants from "../../constants";

interface customer{
    name: string;
    surname: string;
    phone: string;
    address: string;
}

export default function ShoppingCartPopup(){
    const dispatch = useAppDispatch();
    const cartProduct = useAppSelector(state => state.cartProducts.value);
    const totalPrice = useAppSelector(state => state.cartProducts.totalPrice);
    const selectedCurrency = useAppSelector(state => state.currency.currency);
    const [customerInfo, setCustomerInfo] = useState<customer>({
        name: '',
        surname: '',
        phone: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const value = e.target.value;
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: value
        });
    }


    const submitData = async () => {
        if (!isFieldsEmpty()) {
            return; 
        }
        clear();

        const payload = {
          customerInfo,
          cartProduct
        };

        try {
          const response = await fetch(constants.postUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
    
          if (!response.ok) {
            throw new Error('Failed to submit data');
          }
          const data = await response.json();
          console.log('Data submitted successfully:', data);
        } catch (error) {
          console.error('Error submitting data:', error);
        }
    };

    function clear(){
        dispatch(clearCart());
        dispatch(setTotalPrice(selectedCurrency));
        setCustomerInfo({
            name: '',
            surname: '',
            phone: '',
            address: ''});
    }

    const isFieldsEmpty = () => {
        const { name, surname, phone, address } = customerInfo;
        if (!name || !surname || !phone || !address) {
            alert('Please fill in all fields of the form');
            return false;
        }
        return true;
    }

    return(
        <div>
            <section>
                <Menu/>
            </section>            
            <div className="shopping-cart-popup">
                <section>
                    <div className="shopping-cart-popup_cart">
                        {cartProduct.map((product)=>(
                            <CartProduct cartProduct={product} key={product._id}/> 
                        ))}
                    </div>
                     <div className="shopping-cart-popup_total-price">
                        {totalPrice !== 0? 
                            <div>Total price <span className="shopping-cart-popup_total-price_text">{totalPrice} {selectedCurrency}</span></div>: 
                            <div>Basket is empty</div>
                        }
                    </div>
                </section>
                <section className="shopping-cart-popup_form">
                    <form  onSubmit={(e) => e.preventDefault()}>
                        <label> <p>Name:</p>
                            <input type="text" name='name' value={customerInfo.name} className='shopping-cart-popup_form__input' onChange={handleChange}></input>
                        </label>
                        <label> <p>Surname:</p>
                            <input type="text" name='surname' value={customerInfo.surname} className='shopping-cart-popup_form__input' onChange={handleChange}></input>
                        </label>
                        <label> <p>Address:</p>
                            <input type="text" name='address' value={customerInfo.address} className='shopping-cart-popup_form__input' onChange={handleChange}></input>
                        </label>
                        <label> <p>Phone:</p>
                            <input type="text" name='phone' value={customerInfo.phone} className='shopping-cart-popup_form__input' onChange={handleChange}></input>
                        </label>
                        <button onClick={submitData} className="shopping-cart-popup_form__button_order"> Order </button>
                    </form>
                </section>
            </div>
        </div>
    );
}