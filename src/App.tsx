import React from 'react';
import { useAppSelector } from './hooks/hooks';
import ShopPage from './pages/shopPage/ShopPage';
import Header from './components/header/Header';
import ShoppingCartPopup from './pages/shoppingCartPopup/ShoppingCartPopup';

function App() {
  const isVisible = useAppSelector(state => state.cartProducts.isPopupOpen);

  return (
    <div>
        <Header/>
        {isVisible? <ShoppingCartPopup/> : <ShopPage/>}
    </div>
  );
}

export default App;
