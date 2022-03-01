import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/home/Home.js'
import CreateEmployee from "./components/create.employee/CreateEmployee.js";
import CreateCase from "./components/create.case/CreateCase.js";
import SearchCase from "./components/search.case/SearchCase.js";
import SearchEmployee from "./components/search.employee/SearchEmployee.js";
import Main from "./components/main/Main.js";
import MyCase from "./components/my.case/MyCase.js";
import LoginPage from "./pages/login-page/LoginPage.js";
import MainPage from "./pages/main-page/MainPage.js";

function App() {
  return (   
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />

          <Route path="/home" component={Home} />
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
