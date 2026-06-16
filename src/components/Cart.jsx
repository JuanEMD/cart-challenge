const Cart = ({ cartProducts, onRemove }) => {

    if (cartProducts?.length === 0) {
        return (
            <p>Cart empty</p>
        )
    }

    const totalPrice = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);
    const totalItems = cartProducts.reduce((total, product) => total + product.quantity, 0);

    return (
        <section>
            <h2>Cart</h2>
            <ul>
                {cartProducts?.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {product.quantity}</p>
                        <button onClick={() => onRemove(product.id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total items: {totalItems}</p>
            <p>Total price: {totalPrice}</p>
        </section>
    )
}

export default Cart;