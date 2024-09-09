import React, {useEffect}from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { fetchProducts } from "../../features/productSlice";
import Product from "./Product";
import './poductList.css';

export default function ProductList(){
    const productArr = useAppSelector(state => state.products.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return(
        <div className="product-list">
           {productArr.map((product) =>(
                <Product product={product} key={product._id}/>
           ))}
        </div>
    );
}