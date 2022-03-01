import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import CreateEmployee from "./components/create.employee/CreateEmployee.js";
import CreateCase from "./components/create.case/CreateCase.js";
import SearchCase from "./components/search.case/SearchCase.js";
import SearchEmployee from "./components/search.employee/SearchEmployee.js";
import MyCase from "./components/my.case/MyCase.js";
import LoginPage from "./pages/login-page/LoginPage.js";
import HomePage from './pages/home-page/HomePage.js'
import MainPage from "./pages/main-page/MainPage.js";
import NavigationBar from "./components/nav/NavigationBar.js";

function App() {
  return (   
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />

          <Route path="/home" component={HomePage} />
          <Route path="/login" component={LoginPage} />

          <Route path="/employee/create" component={CreateEmployee} />
          <Route path="/employee/search" component={SearchEmployee} />
          
          <Route path="/case/me" component={MyCase} />
          <Route path="/case/create" component={CreateCase} />
          <Route path="/case/search" component={SearchCase} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
