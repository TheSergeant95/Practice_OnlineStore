import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import NavigationBar from "./components/NavigationBar.js";
import { check } from "./http/userAPI.js";
import { Context } from "./index.js";
import { fetchCart, fetchCartItems, fetchItems, fetchOneItem } from "./http/itemAPI.js";

const App = () => {
  const {user, item} = useContext(Context);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      
      check().then(data => {
        user.setUser(true);
        user.setIsAuth(true);
      }).finally(() => setLoading(false));
      fetchItems(null, null, 1, 6).then(data => {
        item.setItems(data.rows)
        item.setTotalCount(data.count)
      });
  }, [])
  useEffect(() => {
    if(user.isAuth){
      fetchCart().then(data => {
        if(user.isAuth){
          item.setCart(data)
        }
      })
      fetchCartItems()
      .then(data => {
        console.log(data.rows)
        if(user.isAuth){
          item.setCartItems(data.rows)
          item.setCartItemCount(0)
          item.cartItems.forEach(cartItem => {
            item.setCartItemCount(item.cartItemCount + cartItem.quantity)
          })
        }
      })
    }
  }, [user.isAuth, item.cartItems])



  if(loading){
    return <Spinner animation="grow"/>
  }

  return (
    <BrowserRouter>
      <NavigationBar/>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
