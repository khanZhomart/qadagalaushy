import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import LoginPage from "./pages/login-page/LoginPage.js";
import HomePage from './pages/home-page/HomePage.js'
import MainPage from "./pages/main-page/MainPage.js";
import CreateCasePage from "./pages/create-case-page/CreateCasePage.js";
import CreateEmployeePage from "./pages/create-employee-page/CreateEmployeePage.js";

function App() {
  return (   
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />

          <Route path="/home" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/case/create" component={CreateCasePage} />

          <Route path="/employee/create" component={CreateEmployeePage} />
          {/* <Route path="/employee/create" component={CreateEmployee} />
          <Route path="/employee/search" component={SearchEmployee} />
          
          <Route path="/case/me" component={MyCase} />
          <Route path="/case/create" component={CreateCase} />
          <Route path="/case/search" component={SearchCase} /> */}
        </Switch>
      </Router>
    </>
  )
}

export default App;
