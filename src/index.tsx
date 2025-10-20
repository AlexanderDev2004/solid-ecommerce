import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Transactions from "./pages/Transactions";
import Admin from "./pages/Admin";

render(
  () => (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/customer" component={Customer} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/admin" component={Admin} />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
