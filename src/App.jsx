import './App.css'
import { useCart } from './hooks/useCart';
import Cart from './components/Cart'
import ProductList from './components/ProductList'

function App() {
  const { products, isLoading, error, cart, totalPrice, totalItems, addToCart, removeFromCart } = useCart();

  return (
    <main>
      <ProductList products={products} isLoading={isLoading} error={error} onAddToCart={addToCart} />
      <Cart cartProducts={cart} totalPrice={totalPrice} totalItems={totalItems} onRemove={removeFromCart} />
    </main>
  )
}

export default App
