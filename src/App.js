import "./App.css";
import { Header } from "./components/Header/Header";
import { BlogContent } from "./containers/BlogPage/BlogPage.js";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";

export function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={BlogContent} />
            <Route exact path='/login' component={LoginPage} />
          </Switch>
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </BrowserRouter>
  );
}
