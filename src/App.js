import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/login/Login.js"
import Home from './components/home/Home.js'
import Register from './components/register/Register.js'
import Sidebar from "./components/nav/Sidebar.js";
import CreateEmployee from "./components/create.employee/CreateEmployee.js";
import CreateCase from "./components/create.case/CreateCase.js";
import SearchCase from "./components/search.case/SearchCase.js";
import SearchEmployee from "./components/search.employee/SearchEmployee.js";
import Main from "./components/main/Main.js";

function App() {
  return (   
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />

          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />

          <Route path="/employee/create" component={CreateEmployee} />
          <Route path="/employee/search" component={SearchEmployee} />
          
          <Route path="/case/create" component={CreateCase} />
          <Route path="/case/search" component={SearchCase} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
