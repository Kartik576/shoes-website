import React, { useState } from 'react';

const initialShoes = [
  { id: 1, name: 'Running Shoes', price: 80, image: './img/img1.jpg' },
  { id: 2, name: 'Running Shoes', price: 120, image: './img/img2.jpg' },
  { id: 3, name: 'Running Shoes', price: 60, image: './img/img3.jpg' },
  { id: 4, name: 'Running Shoes', price: 80, image: './img/img4.jpg' },
];

export default function Shoes1() {
  const [cart, setCart] = useState([]);

  const addToCart = (shoe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoe.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...shoe, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (shoeId) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === shoeId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ fontFamily: 'Arial' }}>
      {/* Top Navbar */}
      <nav
        style={{
          backgroundColor: '#0000ff',
          color: 'white',
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ margin: 0 }}>🛍️ Shoes Store</h2>
        <span>
          🛒 Cart Items: <strong>{cart.reduce((sum, item) => sum + item.quantity, 0)}</strong>
        </span>
      </nav>

      {/* Main Content Area */}
      <div style={{ display: 'flex', padding: 20 }}>
        {/* Shoes List */}
        <div style={{ flex: 1 }}>
         
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {initialShoes.map((shoe) => (
              <li
                key={shoe.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 15,
                  border: '1px solid #ddd',
                  padding: 10,
                  borderRadius: 6,
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  width={80}
                  height={80}
                  style={{ marginRight: 15 }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0 }}>{shoe.name}</h3>
                  <p style={{ margin: '5px 0' }}>${shoe.price}</p>
                </div>
                <button onClick={() => addToCart(shoe)} style ={{ backgroundColor:"#0000ff"}}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Shopping Cart */}
        <div
          style={{
            width: 350,
            marginLeft: 40,
            borderLeft: '2px solid #ccc',
            paddingLeft: 20,
           
          }}
        >
          <h2>Shopping Cart</h2>
          {cart.length === 0 && <p>Your cart is empty.</p>}
          {cart.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cart.map((item) => (
                <li
                  key={item.id}
                  style={{
                    marginBottom: 15,
                    borderBottom: '1px solid #eee',
                    paddingBottom: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginTop: 5,
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    Remove One
                  </button>
                </li>
              ))}
            </ul>
          )}
          <h3>Total: ${totalCost}</h3>
        </div>
      </div>
    </div>
  );
}
