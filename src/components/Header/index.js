import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";

import MainHeader from "./mainHeader";
import IntroHeader from "./introHeader";

import { signOut, updateBalance } from "../../saga/actions/workflow";

function Header(props) {
  // console.log('header network', props.workflow.network);
  const { location } = props;
  if (location.pathname === "/splash" || location.pathname === "/login")
    return null;
  if (
    location.pathname === "/introdashboard" ||
    location.pathname === "/introearn" ||
    location.pathname === "/introborrow" ||
    location.pathname === "/introcards" ||
    location.pathname === "/introteam" ||
    location.pathname === "/terms" ||
    location.pathname === "/risks" ||
    location.pathname === "/fees" ||
    location.pathname === "/useragreement" ||
    location.pathname === "/assetprotect" ||
    location.pathname === "/privacy"
  )
    return <IntroHeader location={location} />;
  if (
    location.pathname === "/dashboard" ||
    location.pathname === "/earn" ||
    location.pathname === "/borrow" ||
    location.pathname === "/stocks" ||
    location.pathname === "/cards" ||
    location.pathname === "/deposit" ||
    location.pathname === "/history"
  )
    return <MainHeader />;
  return <></>;
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      workflow: state.workflow,
    }),
    {
      signOut,
      updateBalance,
    }
  )
)(Header);
