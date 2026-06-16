import { useEffect, useState } from "react";
import { getMockedProducts } from "../api/products";
import Cart from "./Cart";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

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

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (products?.length === 0) return <p>No products available</p>

    return (
        <main>
            <section>
                <ul>
                    {products?.map((product) => (
                        <li key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <Cart cartProducts={cart} onRemove={removeFromCart} />
            </section>
        </main>
    )

}

export default ProductList;