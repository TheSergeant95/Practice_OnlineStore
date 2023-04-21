import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import NavigationBar from "./components/NavigationBar.js";
import { check } from "./http/userAPI.js";
import { Context } from "./index.js";
import { fetchItems } from "./http/itemAPI.js";
import AppFooter from "./components/AppFooter.js";

const App = () => {
  const {user, item} = useContext(Context);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      
      check().then(data => {
        user.setUser(true);
        user.setIsAuth(true);
        if(data.role === 'ADMIN')
			  {
				  user.setIsAdmin(true)
			  } else {
				  user.setIsAdmin(false)
			  }
      }).finally(() => setLoading(false));
      fetchItems(null, null, 1, 6).then(data => {
        item.setItems(data.rows)
        item.setTotalCount(data.count)
      });
  }, [])
  



  if(loading){
    return <Spinner animation="grow"/>
  }

  return (
    <BrowserRouter>
      <NavigationBar/>
      <AppRouter />
      <AppFooter/>
    </BrowserRouter>
  );
}

export default App;
