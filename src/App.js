import Login from "./Components/Login/Login";
import Loading from "./Components/AddNewColor/Loading";
import AddNewColor from "./Components/AddNewColor/AddNewColor";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let userKey = localStorage.getItem("user");
    console.log(userKey);
    if (userKey) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Route path={"/"} exact>
          <Login />
        </Route>
        <Route path={"/AddColor"}>
          <AddNewColor />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
