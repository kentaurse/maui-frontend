import { withRouter, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

import { signOut, updateBalance } from "../../saga/actions/workflow";
import useWindowSize from "../../utils/useWindowSize";

const MENU = [
  { title: "Earn", url: "/introearn" },
  { title: "Borrow", url: "/introborrow" },
  { title: "Cards", url: "/introcards" },
  { title: "Team", url: "/introteam" },
];

function Logo(props) {
  let history = useHistory();
  const handleClick = () => {
    props.closeMobileMenu();
    if (props.pathname !== "/introdashboard") {
      history.push("/introdashboard");
    }
  };
  return (
    <div
      className="bg-introheader-logoimage w-[83px] h-[34px] md:h-[40px] md:w-[100px] bg-center bg-cover drop-shadow-[0_0px_1px_rgba(116,95,242,0.5)] cursor-pointer"
      onClick={handleClick}
    ></div>
  );
}

function NavItem(props) {
  return (
    <div
      className={`text-[#ffffffad] text-[18px] ${
        props.isSelected
          ? "drop-shadow-[0_0px_5px_#FFFFFF] !text-[#FFFFFF]"
          : ""
      } cursor-pointer`}
      onClick={props.handleClick.bind(this, props.newIndex)}
    >
      {props.title}
    </div>
  );
}

const NavBar = withRouter((props) => {
  let history = useHistory();
  const [currentSelected, setCurrentSelected] = useState(5);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    // console.log("header", size.width)
    if (size.width < 768) setIsMobile(true);
    else setIsMobile(false);
  }, [size]);

  useEffect(() => {
    let navIndex = MENU.map(
      (menu) => menu.url === props.location.pathname
    ).indexOf(true);
    if (navIndex > -1) setCurrentSelected(navIndex);
    else setCurrentSelected(5);
  }, [props.location]);

  const handleClick = (dest) => {
    setCurrentSelected(dest);
    if (props.location.pathname !== props.tabs[dest].url)
      history.push(props.tabs[dest].url);
  };

  const handleMobileMenu = () => {
    if (mobileMenuOpen) setMobileMenuOpen(false);
    else setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (isMobile)
    return (
      <>
        <div className="px-[31px] py-[1px] md:px-[14.62%] md:py-[21px] flex items-center justify-between">
          <Logo pathname={props.pathname} closeMobileMenu={closeMobileMenu} />
          <div
            className={`w-[56px] h-[54px] ${
              mobileMenuOpen
                ? "bg-introheader-mobilemenuclose"
                : "bg-introheader-mobiletab"
            } bg-cover bg-center transition-all duration-500`}
            onClick={handleMobileMenu}
          ></div>
          {mobileMenuOpen && (
            <MobileNavBar tabs={MENU} closeMobileMenu={closeMobileMenu} />
          )}
        </div>
      </>
    );
  return (
    <div className="px-[31px] py-[1px] md:px-[14.62%] md:py-[21px] flex items-center justify-between">
      <Logo pathname={props.pathname} closeMobileMenu={closeMobileMenu} />
      <div className="min-w-[400px] w-[46.82%] h-[40px] flex items-center justify-between">
        {_.map(props.tabs, (tab, index) => {
          return (
            <NavItem
              key={index}
              newIndex={index}
              title={props.tabs[index].title}
              handleClick={handleClick}
              isSelected={index === currentSelected}
            />
          );
        })}
        <div
          className="w-[120px] h-[30px] bg-[#1199FA] rounded-[18px] flex justify-center items-center text-[#FFFFFF] text-[16px] cursor-pointer"
          onClick={() => history.push("/dashboard")}
        >
          Start Now
        </div>
      </div>
    </div>
  );
});

function MobileNavItem(props) {
  return (
    <div
      className={`h-[56px] pl-[42px] flex items-center text-[#ffffff] text-[24px] ${
        props.isSelected
          ? "drop-shadow-[0_0px_5px_#FFFFFF] !text-[#FFFFFF]"
          : ""
      } cursor-pointer`}
      onClick={props.handleClick.bind(this, props.newIndex)}
    >
      {props.title}
    </div>
  );
}

const MobileNavBar = withRouter((props) => {
  let history = useHistory();
  const [currentSelected, setCurrentSelected] = useState(5);

  useEffect(() => {
    if (props.location.pathname === "/introdashboard") setCurrentSelected(5);
  }, [props.location]);

  const handleClick = (dest) => {
    setCurrentSelected(dest);
    props.closeMobileMenu();
    if (props.location.pathname !== props.tabs[dest].url)
    history.push(props.tabs[dest].url);
  };

  return (
    <div className="absolute left-0 top-[55.5px] w-full h-[calc(100vh-56px)] flex flex-col">
      <div className="relative w-[100%] h-[100%]">
        <div
          className="w-[100%] h-[100%]"
          onClick={() => {
            props.closeMobileMenu();
          }}
        ></div>
        <div className="absolute left-0 top-0 w-full bg-[#061121]  z-40">
          {_.map(props.tabs, (tab, index) => {
            return (
              <MobileNavItem
                key={index}
                newIndex={index}
                title={props.tabs[index].title}
                handleClick={handleClick}
                isSelected={index === currentSelected}
              />
            );
          })}
          <div
            className="h-[56px] mt-[7px] mb-[28px] mx-[31px] text-[24px] leading-[29px] bg-[#1199FA] rounded-[10px] flex justify-center items-center text-[#FFFFFF] text-[16px] cursor-pointer"
            onClick={() => history.push("/signin")}
          >
            Start Now
          </div>
        </div>
      </div>
    </div>
  );
});

function IntroHeader(props) {
  // console.log('header network', props.workflow.network);
  const { location } = props;
  if (
    location.pathname === "/splash" ||
    location.pathname === "/login" ||
    location.pathname === "/dashboard"
  )
    return null;

  return (
    <div className="fixed md:absolute top-0 w-full h-[56px] md:h-[82px] md:top-[6.31vh] bg-[#061121] z-30">
      <NavBar tabs={MENU} pathname={location.pathname} />
    </div>
  );
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
)(IntroHeader);
