import { Route, Router } from "@solidjs/router";
import App from "./App";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Transactions from "./pages/Transactions";

export default function Routes() {
  return (
    <Router>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/customer" component={Customer} />
      <Route path="/transactions" component={Transactions} />
    </Router>
  );
}
