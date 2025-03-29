import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
// import "tailwindcss/tailwind.css";

const products = [
  { id: 1, title: "Apple Watch", desc: "Series 5 SE", price: 529.99, img: "https://bgr.com/wp-content/uploads/2024/09/apple-iphone-16-pro-max-plus-watch-10-ultra-airpods-4-launch-event-19.jpg?resize=1020%2C574&quality=82" },
  { id: 2, title: "Sony ZX330BT", desc: "Light Grey", price: 39.99, img: "https://5.imimg.com/data5/ANDROID/Default/2023/3/BG/HX/KL/151968513/product-jpeg.jpg" },
  { id: 3, title: "iPhone 11 pro", desc: "Serious Black", price: 819.99, img: "https://images.hindi.news18.com/ibnkhabar/uploads/2019/09/iphone-11-2.jpg?impolicy=website&width=640&height=480" },
  { id: 4, title: "iPhone 11", desc: "Subway Blue", price: 619.99, img: "https://images-cdn.ubuy.co.in/65674d5c1bd6de1c3f243075-apple-iphone-11-a2111-64gb-red-us.jpg" },
  { id: 5, title: "MacBook Pro 16\"", desc: "Silver - M1 Pro", price: 3249.99, img: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24371431/236492_MacBook_Pro_16__2023__AKrales_0114.jpg?quality=90&strip=all&crop=0,0,100,100" },
  { id: 6, title: "iPhone 12", desc: "Product RED", price: 719.99, img: "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2022/05/iPhone_12_Lineup_Screen__WWEN.jpg?ssl=1&quality=80&w=800" },
  { id: 7, title: "iPhone 16", desc: "Milky White", price: 669.99, img: "https://quicktech.in/cdn/shop/files/6_4669543f-8d58-45a8-9ce7-5047616e8414.jpg?v=1728225184&width=1445" }
];

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItem = updatedCart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-gray-900 text-2xl font-bold">Product Store</h1>
        <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative text-gray-900 text-2xl">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm w-5 h-5 flex items-center justify-center rounded-full">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>
      </nav>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-lg text-center transition-transform transform hover:scale-105">
            <img src={product.img} alt={product.title} className="w-full h-40 object-cover mb-2 rounded-lg" />
            <div className="flex justify-between items-center">

            <div className="justify-items-start">

            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.desc}</p>
            <p className="text-gray-900 font-bold text-lg mt-1">${product.price}</p>
            </div>
            <button onClick={() => addToCart(product)} className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-full">
              Add to Cart
            </button>
            </div>

          </div>
        ))}
      </div>

      <div className={`fixed top-0 right-0 h-full w-68 bg-white shadow-xl p-4 overflow-y-auto transform transition-transform ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-bold my-4">Shopping Cart</h2>
        <button onClick={() => setIsCartOpen(false)} className="w-10  bg-red-500 text-white p-1 rounded">x</button>
        </div>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-2">
              <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
              <div className="ml-4 flex-1">
                <h3 className="text-md font-semibold">{item.title}</h3>
                <p className="text-gray-600 text-sm">${item.price} x {item.quantity}</p> 
                <p className="text-gray-600 text-sm">Total = ${item.price*item.quantity}</p> 
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="bg-gray-200 px-2 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="bg-gray-200 px-2 rounded">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4"><FaTrash /></button>
            </div>
          ))
        )}
        
      </div>
    </div>
  );
};

export default App;
