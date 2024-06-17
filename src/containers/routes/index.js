import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PrivateRoute, PublicRoute } from "./utils";

import Splash from "../pages/Splash";
import IntroDashBoard from "../pages/_intro/IntroDashBoard";
import IntroEarn from "../pages/_intro/introEarn";
import IntroBorrow from "../pages/_intro/introBorrow";
import IntroCards from "../pages/_intro/introCards";
import IntroTeam from "../pages/_intro/introTeam";
import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import Earn from "../pages/Earn";
import Borrow from "../pages/Borrow";
import Stocks from "../pages/Stocks";
import Cards from "../pages/Cards";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import AssetProtect from "../pages/AssetProtect";
import UserAgreement from "../pages/UserAgreement";
import Risks from "../pages/Risks";
import Fees from "../pages/Fees";
import Deposit from "../pages/Deposit";
import History from "../pages/History";

const Routes = withRouter(({ location }) => {
  return (
    <TransitionGroup className="w-full">
      <CSSTransition
        timeout={1000}
        classNames="transition-fade"
        key={location.key}
      >
        {(state) => {
          return (
            <Switch location={location}>
              <Route path="/splash" component={Splash} />
              <Route path="/introdashboard" component={IntroDashBoard} />
              <Route path="/introearn" component={IntroEarn} />
              <Route path="/introborrow" component={IntroBorrow} />
              <Route path="/introcards" component={IntroCards} />
              <Route path="/introteam" component={IntroTeam} />
              <Route path="/login" component={Login} />
              <Route path="/signin" component={SignIn} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/assetprotect" component={AssetProtect} />
              <Route path="/useragreement" component={UserAgreement} />
              <Route path="/risks" component={Risks} />
              <Route path="/fees" component={Fees} />
              <Route
                path="/dashboard"
                render={(props) => <Dashboard state={state} />}
              />
              <PrivateRoute path="/earn" component={Earn} />
              <PrivateRoute path="/borrow" component={Borrow} />
              <PrivateRoute path="/stocks" component={Stocks} />
              <PrivateRoute path="/cards" component={Cards} />
              <PrivateRoute path="/deposit" component={Deposit} />
              <PrivateRoute path="/history" component={History} />
              <Redirect to="/splash" />
            </Switch>
          );
        }}
      </CSSTransition>
    </TransitionGroup>
  );
});

export default Routes;
