import React from "react";

const Cart = (props) => {
  const { item ,increaseQ,decreaseQ,removeFromCart, cartCountTotal} = props;

  const cartPriceTotal = item.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const numberFormat = val =>
  Number.isInteger(val) ? val : val.toFixed(2);
   
  return (
    <div style={{ width: "100%" }}>
     <h4> Cart Item : {cartCountTotal} - Total Price: ${numberFormat(cartPriceTotal)}
      </h4>
      {item && item.map((val,i)=>{
        return (
            <div
            style={{
              width: "300px",
              textAlign: "center",
              backgroundColor: "darkseagreen",
              display:"flex"
            }}
          >
            <div style={{ width: "150px" }}>
              <img src={val.src} alt="cart-item" style={{ width: "inherit" }} />
            </div>
            <div style={{ width: "150px" }}>
              <p>{val.name}</p>
              <p>${numberFormat(val.quantity*val.price)}</p>
              <button  onClick={() => increaseQ(i)}>+</button>
              <p>{val.quantity}</p>
              <button  onClick={() => decreaseQ(i)}>-</button>
              <button onClick={()=>{removeFromCart(i)}}>Remove</button>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Cart;
