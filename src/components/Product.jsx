import { useState, useContext , useEffect} from 'react';
import { CartContext } from '../context/cart.jsx';

export default function Product({ post }) {
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);

  const [isAdded, setIsAdded] = useState(false); // Local state for add/remove

  const handleAddToCart = () => {
    addToCart(post);
    setIsAdded(true); // Update local state for visual feedback
  };

  const handleRemoveFromCart = () => {
    removeFromCart(post.id);
    setIsAdded(false); // Update local state for visual feedback
  };

  useEffect(() => {
    // Update isAdded based on global cart state on initial render and updates
    setIsAdded(cartItems.some((item) => item.id === post.id));
  }, [cartItems, post.id]);

  return (
    <div className="flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline">
      <div>
        <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">{post.title}</p>
      </div>
      <div>
        <p className="w-50 text-gray-500 font-normal text-[10px] text-left">{post.description.split(" ").slice(0,10).join(" ") + "..."}</p>
      </div>
      <div className="h-[180px]">
        <img src={post.image} alt={post.title} className="h-full w-full" />
      </div>

      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">${post.price}</p>
        </div>
        <div>
          {cartItems.some((item) => item.id === post.id) ? (
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              onClick={handleRemoveFromCart}
            >
              Remove Item
            </button>
          ) : (
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              onClick={handleAddToCart}
            >
              {isAdded ? "Added" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
