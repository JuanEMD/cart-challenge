

const ProductList = ({ products, isLoading, error, onAddToCart }) => {

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
                            <button onClick={() => onAddToCart(product)}>Add to Cart</button>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default ProductList;