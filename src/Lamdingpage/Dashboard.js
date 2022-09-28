import React,{useState} from "react";
import API from "../mockAPI";
import Cart from "./Cart";

const Dashboard = () => {
     const [items, setItems] = useState(API);
    const [cart, setCart] = useState([]);
console.log(items); 
 const getcrtItem = i => {
    setItems(state =>
      state.map((item, p) => {
        if (i === p) {
          setCart([
            ...cart,
            { name: item.name, price: item.price, quantity: item.quantity,src:item.src }
          ]);
          return { ...item };
        }
        return item;
      })
    );
  };
  const increaseQuantity = {
    inCarrt: i => {
            setCart(state =>
        state.map((item, o) => {
          console.log(item);
          if (i === o && item.quantity < 10) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    },
  };

  const decreaseQuantity = {
    inCarrt: i => {
      setCart(prevCart =>
        prevCart.map((item, o) => {
          if (i === o && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      );
    },
  };
  const removeFromCart = i => {
    let chosenItem, index;
    index = 0;
    while (index < cart.length) {
      if (index === i) {
        chosenItem = cart[index].name;
        break;
      }
      index++;
    }
    setCart(state => state.filter(item => chosenItem !== item.name));
    setItems(state =>
      state.map(item => {
        if (item.name === chosenItem) {
          return { ...item, inCart: false, quantity: 1 };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.quantity, 0);
  
   return (
    <div style={{alignItems:"center"}}>
      Dashboard
      {API &&
        API.map((val, i) => {
          return (
            <div style={{width:"300px",textAlign:"center" ,backgroundColor:"darkseagreen"}}>
              <h4>{val.name}</h4>
              <p> $ {val.price}</p>
              <span>{val.quantity} + {cart.quantity}</span> <br/>
              <img src={val.src} alt="imageeee" style={{width:"inherit"}} />
              <button onClick={()=>getcrtItem(i)}>Add To Cart</button>
              <button  onClick={() => increaseQuantity.inCarrt(i)}>+</button> 
            </div>
            
          );
          
        })}
                     
        <Cart 
        item={cart}
          increaseQ={increaseQuantity.inCarrt}
          decreaseQ={decreaseQuantity.inCarrt}
          cartCountTotal={cartCountTotal}
          removeFromCart={removeFromCart}
        />
    </div>
  );
};

export default Dashboard;
