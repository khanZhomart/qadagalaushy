import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/login/Login.js"
import Home from './components/home/Home.js'
import Register from './components/register/Register.js'
import Sidebar from "./components/nav/Sidebar.js";
import CreateEmployee from "./components/create.employee/CreateEmployee.js";

function App() {
  return (   
    <>
      <Router>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/employee/create" component={CreateEmployee} />
        </Switch>
      </Router>
    </>
  )
}

export default App;
