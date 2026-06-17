import { useState, useEffect } from "react";
import { getMockedProducts } from "../api/products";

export const useCart = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                return prevCart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }

            return [...prevCart, { ...product, quantity: 1 }];
        })
    }

    const removeFromCart = (id) => {
        setCart((prevCart) => {

            const product = prevCart.find((item) => item.id === id);

            if (product.quantity > 1) {
                return prevCart.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
            }

            return prevCart.filter((item) => item.id !== id);
        });
    }

    useEffect(() => {
        getMockedProducts().then((data) => {
            setProducts(data);
            setIsLoading(false);
        }).catch((err) => {
            setError(err.message);
            setIsLoading(false);
        })
    }, []);

    return { products, isLoading, error, cart, totalPrice, totalItems, addToCart, removeFromCart };
}
