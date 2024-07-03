import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import CartItem from '../components/CartItem';
import { Helmet } from 'react-helmet';

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart);

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <Helmet>
          <title>Cart</title>
          <meta
            name="description"
            content="Welcome to the home page of my app."
          />
        </Helmet>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-4 text-lg">
          You have no items in your shopping cart. Start adding some!
        </p>
        <Link to="/" className="text-blue-500 underline mt-4 inline-block">
          Go back to shop
        </Link>
      </div>
    );
  }

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <div className="container mx-auto mt-10">
      <Helmet>
        <title>Cart</title>
        <meta
          name="description"
          content="Welcome to the home page of my app."
        />
      </Helmet>
      ;<h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <ul>
        {cart.items.map(item => (
          <CartItem key={item._id} item={item} />
        ))}
      </ul>
      <div className="text-right mt-4">
        <h4 className="text-lg font-bold">
          Subtotal: ${totalPrice.toFixed(2)}
        </h4>
        <p className="text-sm">Shipping Price: ${cart.shippingPrice}</p>
        <p className="text-sm">Tax: ${cart.taxPrice}</p>
        <h4 className="text-lg font-bold mt-2">
          Total: $
          {(
            totalPrice +
            parseFloat(String(cart.shippingPrice)) +
            parseFloat(String(cart.taxPrice))
          ).toFixed(2)}
        </h4>
      </div>
      <Link
        to="/checkout/shipping"
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block"
      >
        Checkout
      </Link>
    </div>
  );
};

export default CartPage;
