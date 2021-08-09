import "./App.css";
import { Header } from "./components/Header/Header";
import { BlogContent } from "./containers/BlogPage/BlogPage.js";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { useState } from "react";

export function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')
  const [userName, setUserName] = useState(localStorage.getItem('userName'))

  return (
    <BrowserRouter>
      <div className="App">
        <Header userName={userName} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main>
          <Switch>
            <Route exact path='/' component={BlogContent} />
            <Route exact path='/login' render={(props) => <LoginPage {...props} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
          </Switch>
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
