import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { compose } from "redux";
import { connect, useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import {
  CountryDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
import AnimatedTab from "../AnimatedTab";
import DarkMode from "../DarkMode";
import NetworkSwitch from "../NetworkSwitch";
import {
  signOut,
  updateBalance,
  updateAllBalance,
} from "../../saga/actions/workflow";
import Button from "../Button";
import { appConfig } from "../../appConfig";
import { shortenAddress } from "../../utils/shortenAddress";
import { validateUserProfile } from "../../utils/validateProfile";

const MENU = [
  { title: "Dashboard", url: "/dashboard" },
  { title: "Earn", url: "/earn" },
  { title: "Borrow", url: "/borrow" },
  { title: "Stocks", url: "/stocks" },
  { title: "Cards", url: "/cards" },
];

function Logo(props) {
  let history = useHistory();
  const strDate = moment().format("dddd, D MMMM, YYYY");
  const handleClick = () => {
    if (props.pathname !== "/introdashboard") {
      history.push("/introdashboard");
    }
  };
  return (
    <div className="w-full h-[40px] md:h-[70px]">
      <div
        className="bg-splash-logo dark:bg-splash-logo-dark bg-center bg-cover w-[90px] h-[30px] md:w-[120px] md:h-[40px] transition-all duration-1000 cursor-pointer"
        onClick={handleClick}
      ></div>
      <div className="hidden md:block mt-[15px] text-[#929daf] dark:text-[#F9D3B4] font-medium text-[12px] leading-[12px] pl-2 transition-all duration-1000">
        {strDate}
      </div>
    </div>
  );
}

function DepositStatus({
  isDepositPage,
  symbol,
  balance,
  isLoading,
  kind,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  // const balanceClass = `absolute ${
  //   isDepositPage
  //     ? "left-[-70px] top-[2px] md:left-[-80px] md:top-[13px]"
  //     : "left-[30px] md:left-[60px] top-[-23px]"
  // } bg-header-balance w-[60px] h-[14px] bg-cover bg-center`;
  return (
    <div
      className="relative ml-[5px] md:ml-[15px] bg-[#DEE2E8] dark:bg-[#31303650] dark:bg-header-login-btn-dark rounded-[7px] md:rounded-[14px] w-[103px] h-[21px] md:w-[206px] md:h-[42px] border border-[#728AB7A0] p-1 flex justify-evenly items-center cursor-pointer"
      title="Click here to update balance"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* <div className={balanceClass} /> */}
      <span className="text-[#707070] text-[12px] md:text-[18px]">
        {symbol}
      </span>
      <span className="font-semibold w-[60px] md:w-[100px] text-[12px] md:text-[18px] leading-[24px] mt-[1px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] transition-all duration-1000">
        {isLoading ? "..." : balance}
      </span>
      <span className="text-[#707070] text-[12px] md:text-[18px]">{kind}</span>
    </div>
  );
}

function LoginButton() {
  // const { disconnect } = useWallet();
  let history = useHistory();
  function handleClick() {
    history.push("/signin");
  }
  const label = "LOGIN";
  return (
    <Button
      className="flex justify-center items-center ml-[5px] md:ml-[15px] rounded-[5px] md:rounded-[10px] shadow-header-login-btn border-0 dark:border-2 dark:border-[#1199FA] w-[45px] h-[21px] md:w-[93px] md:h-[42px] bg-[#F3F3FB] dark:bg-transparent"
      onClick={handleClick}
    >
      <span className="font-semibold text-[10px] leading-[12px] mt-[2px] md:mt-0 md:text-[16px] md:leading-[24px] text-[#1199FA] dark:text-[#1199FA] transition-all duration-1000">
        {label}
      </span>
    </Button>
  );
}

function UserSetting({ label, signOut }) {
  const [userDropdownShow, setUserDropdownShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [userProfileModalShow, setUserProfileModalShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [state, setState] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (modalShow || userProfileModalShow) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [modalShow, userProfileModalShow]);

  function handleSIgnOutClick() {
    localStorage.clear();
    signOut();
  }

  function handleUserDropdown() {
    if (userDropdownShow) setUserDropdownShow(false);
    else setUserDropdownShow(true);
  }

  function handleKYC() {
    toast.success("In this KYC, you will be directed to 3rd party service");
    setUserDropdownShow(false);
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      headers: { Authorization: `bearer ${token}` },
      url: `${appConfig.apiUrl}/v1/kyc`,
    })
      .then((result) => {
        // const url = result.data?.url || "";
        const reserve = result.data;
        console.log(result);
        if (result.data?.onboardingUrl) {
          window.open(
            result.data?.onboardingUrl,
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,right=0,width=450,height=700"
          );
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
    // setModalShow(true);
  }

  const handleUserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    setDateOfBirth(user.dateOfBirth || '');
    setCountry(user.country || '');
    setState(user.state || '');
    setCity(user.city || '');
    setStreet(user.street || '');
    setPostalCode(user.postalCode || '');
    setPhone(user.phone || '');
    setEmail(user.email || '');
    setUserProfileModalShow(true);
  }

  const handleUpdateProfile = () => {

    const data = {
      firstName,
      lastName,
      dateOfBirth,
      country,
      state,
      city,
      street,
      postalCode,
      phone,
      email
    }
    console.log(data)
    if (!validateUserProfile(data)) {
      toast.error("You must fill in the required fields.");
      return;
    }
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    axios({
      method: "patch",
      headers: { Authorization: `bearer ${token}` },
      data,
      url: `${appConfig.apiUrl}/v1/users/${user.id}`,
    }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success("Your profile is updated.");
      setUserProfileModalShow(false);
    }).catch(err => {
      console.log("error", err);
    })
  }

  const resetUserProfile = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      //data, 
      headers: { Authorization: `bearer ${token}` },
      url: `${appConfig.apiUrl}/v1/kyc`,
    })
      .then((result) => {
        // const url = result.data?.url || "";
        const reserve = result.data;
        console.log(result);
        if (result.data?.onboardingUrl) {
          window.open(
            result.data?.onboardingUrl,
            "_blank",
            "toolbar=yes,scrollbars=yes,resizable=yes,right=0,width=450,height=700"
          );
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  // const label = props.label;
  return (
    <>
      <div className="relative">
        <Button
          className="flex justify-center items-center ml-[5px] md:ml-[15px] rounded-[5px] md:rounded-[10px] shadow-header-login-btn border-0 dark:border-2 dark:border-[#1199FA] w-[45px] h-[21px] md:w-[110px] md:h-[42px] bg-[#F3F3FB] dark:bg-transparent"
          onClick={handleUserDropdown}
        >
          <span className="font-semibold text-[10px] leading-[12px] mt-[2px] md:mt-0 md:text-[16px] md:leading-[24px] text-[#1199FA] dark:text-[#1199FA] transition-all duration-1000">
            {shortenAddress(label)}
          </span>
        </Button>
        {userDropdownShow && (
          <div className="absolute left-[-10px] md:left-[15px] top-[30px] md:top-[43px] w-[60px] md:w-[93px] py-[10px] bg-[#F3F3FB] dark:bg-[#1c1f21] text-[#1199FA] text-[12px] md:text-[16px] dark:text-[#1199FA] dark:border-2 dark:border-[#1199FA] font-[600] flex justify-center items-center z-50 rounded-[10px]">
            <div className="">
              <div
                className="cursor-pointer"
                onClick={handleUserProfile}
              >
                Profile
              </div>
              <div className="mt-[10px] cursor-pointer" onClick={handleKYC}>
                KYC
              </div>
              <div
                className="mt-[10px] cursor-pointer"
                onClick={handleSIgnOutClick}
              >
                LogOut
              </div>
            </div>
          </div>
        )}
      </div>
      {userDropdownShow && (
        <div
          className="fixed left-0 top-0 w-[100vw] h-[100vh] z-10"
          onClick={handleUserDropdown}
        ></div>
      )}
      {/* {modalShow && (
        <div>
          <div
            className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[#fff] z-[10] opacity-80"
            onClick={() => setModalShow(false)}
          ></div>
          <div className="fixed left-[20vw] top-[10vh] w-[60vw] h-[80vh] bg-deposit-card dark:bg-deposit-card-dark z-[20] rounded-[30px] ">
            <div className="mt-[30px] text-center text-[30px] dark:text-[#FFF]">KYC</div>
          </div>
        </div>
      )} */}

      {userProfileModalShow && (
        <div>
          <div className="overflow-y-auto md:overflow-y-hidden fixed left-0 md:left-[50vw] top-0 w-full md:w-[50vw] h-[100vh] bg-deposit-card dark:bg-deposit-card-dark z-[60]">
            <div className="mt-[30px] flex justify-between md:h-[50px]">
              <div className="flex justify-center items-center text-[30px] text-[#000] dark:text-[#FFF] font-[600] w-[90%] h-[100%]">
                User Profile
              </div>
              <div
                className="flex justify-center items-center h-[100%] text-[30px] md:text-[40px] dark:text-[#FFF] w-[15%] md:w-[10%] cursor-pointer"
                onClick={() => setUserProfileModalShow(false)}
              >
                &times;
              </div>
            </div>
            <div className="md:h-[calc(100vh-50px)] md:w-full px-[30px] dark:text-[#FFF] overflow-auto">
              <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
                <div className="md:w-[45%]">
                  <div>First Name*</div>
                  <input
                    type="text"
                    className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%]">
                  <div>Last Name*</div>
                  <input
                    type="text"
                    className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
                <div className="md:w-[45%]">
                  <div>Birthday*</div>
                  <input
                    type="date"
                    className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                    value={dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                    }}
                  />
                </div>
                <div className="md:w-[45%]">
                  <PhoneInput
                    specialLabel="Phone Number*"
                    inputClass="w-[100%] rounded-[12px] border-transparent  text-[#000]"
                    country={"us"}
                    value={phone}
                    onChange={phone => setPhone(phone)}
                  />
                </div>
              </div>
              <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
                <div className="md:w-[45%]">
                  <div>Country*</div>
                  <CountryDropdown
                    className="w-[100%] rounded-[12px] border-transparent text-[#000]"
                    value={country}
                    onChange={(val) => {
                      const countryShortName = CountryRegionData.filter(
                        (country) => country[0] === val
                      );
                      setCountry(val);
                    }}
                  />
                </div>
                <div className="md:w-[45%]">
                  <div>State</div>
                  <input
                    type="text"
                    className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:mt-[10px]">Street*</div>
              <input
                type="text"
                className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
                <div className="md:w-[45%]">
                  <div>Postal / ZIP code*</div>
                  <input
                    type="text"
                    className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
                <div className="md:w-[45%]">
                  <div>City*</div>
                  <input
                    type="text"
                    className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:mt-[10px]">Email*</div>
              <input
                type="text"
                className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
                value={email}
                disabled
              />

              <Button
                // isLoading={addPayLoading}
                className="mt-[10px] md:mt-[20px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full"
                onClick={handleUpdateProfile}
              >
                UPDATE
              </Button>
            </div>
          </div>
          <div
            className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[#fff] z-[10] opacity-80"
            onClick={() => setUserProfileModalShow(false)}
          ></div>
        </div>
      )}
    </>
  );
}

function MainHeader(props) {
  const [showPrice, setShowPrice] = useState(false);
  // console.log('header network', props.workflow.network);
  const dispatch = useDispatch();
  const { location } = props;
  let history = useHistory();
  const handleDepositClick = () => {
    history.push("/deposit");
  };
  const handleHistoryClick = () => {
    history.push("/history");
  };
  const handleUpdateBalance = () => {
    dispatch(updateAllBalance({ url: "/v1/balances" }));
  };

  if (location.pathname === "/splash" || location.pathname === "/login")
    return null;
  const isTheme2 =
    location.pathname === "/deposit" || location.pathname === "/history";
  const theme2Title = location.pathname === "/deposit" ? "Deposit" : "History";

  return (
    <div className="absolute top-0 left-[calc(50%-180px)] md:left-[calc(50%-450px)] w-[360px] md:w-[900px] z-50">
      <div className="mt-[25px] flex justify-between items-end">
        <Logo pathname={location.pathname} />
      </div>
      {isTheme2 ? (
        <div className="relative w-full mt-[5px] md:mt-[20px] h-[50px] md:h-[74px] p-[6px] md:p-4 rounded-[14px] bg-[#E5E9ED] dark:bg-[#2A1B31] drop-shadow-[0_0px_7px_rgba(116,95,242,0.28)] border-2 dark:border-transparent">
          <span className="absolute left-[10px] top-[10px] md:left-[30px] md:top-[23px] font-semibold text-[14px] md:text-[24px] leading-[24px] tracking-[2px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]">
            {theme2Title}
          </span>
        </div>
      ) : (
        <div className="fixed bottom-[90px] md:absolute md:top-[105px] left-[calc(50%-180px)] md:left-[calc(50%-450px)] w-[360px] md:w-[900px] z-50">
          <AnimatedTab tabs={MENU} />
        </div>
      )}
      <div
        className={`absolute transition-all duration-1000 flex justify-between items-center ${isTheme2
          ? "top-[80px] md:top-[130px] right-[10px] md:right-[20px]"
          : "top-[25px] md:top-[50px] right-[0px]"
          }`}
      >
        {props.workflow.isLogged && !isTheme2 && (
          <button
            onClick={handleDepositClick}
            className="flex justify-center items-center rounded-[5px] md:rounded-[20px] shadow-header-deposit-btn dark:shadow-header-deposit-btn-dark w-[60px] h-[20px] md:w-[110px] md:h-[32px] bg-[#FFFFFF50] bg-header-deposit-btn dark:bg-header-deposit-btn-dark text-[#000000]
          "
          >
            <span className="font-semibold text-[10px] leading-[12px] md:text-[16px] md:leading-[24px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] dark:from-[#F9D3B4] dark:to-[#F9D3B4] transition-all duration-1000">
              DEPOSIT
            </span>
          </button>
        )}
        {props.workflow.isLogged && (
          <div className="relative">
            <DepositStatus
              isDepositPage={isTheme2}
              symbol="$"
              balance={
                props.workflow?.availableBalances &&
                  Object.keys(props.workflow?.availableBalances).length > 0
                  ? Math.floor(
                    Object.values(props.workflow?.availableBalances)[0] * 1000
                  ) / 1000
                  : 0
              }
              isLoading={props.workflow.isUpdatingBalance}
              kind={
                props.workflow?.availableBalances &&
                Object.keys(props.workflow?.availableBalances).length > 0 &&
                Object.keys(props.workflow?.availableBalances)[0]
              }
              onClick={handleUpdateBalance}
              onMouseEnter={() => {
                setShowPrice(true);
              }}
              onMouseLeave={() => setShowPrice(false)}
            />
            {showPrice && (
              <div
                className="absolute top-[20px] rounded-[7px] md:rounded-[14px] w-[103px] md:w-[206px] md:top-[41px] ml-[5px] md:ml-[15px] w-full max-h-[300px] z-50 overflow-auto bg-[#DEE2E8]"
                onMouseEnter={() => {
                  setShowPrice(true);
                }}
                onMouseLeave={() => setShowPrice(false)}
              >
                {Object.keys(props.workflow?.availableBalances).map(
                  (currency, index) => {
                    return (
                      <div
                        className="w-full py-[7px] px-[4px] md:px-[20px] flex justify-between items-center text-[#707070] text-[12px] md:text-[14px]"
                        key={index}
                      >
                        <div className="flex items-center">
                          ${" "}
                          <div className="md:ml-[5px] font-semibold md:w-[60px] md:w-[100px] text-[12px] md:text-[14px] leading-[24px] mt-[1px] text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] transition-all duration-1000">
                            {Math.floor(
                              Object.values(props.workflow?.availableBalances)[
                              index
                              ] * 1000
                            ) / 1000}
                          </div>
                        </div>
                        <div className="text-[#707070] text-[12px] md:text-[14px]">
                          {
                            Object.keys(props.workflow?.availableBalances)[
                            index
                            ]
                          }
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}
        {props.workflow.isLogged && (
          <div
            className="bg-header-history dark:bg-header-history-dark m-[5px] ml-[5px] md:ml-[10px] w-[20px] h-[20px] md:w-[30px] md:h-[30px] bg-cover bg-center cursor-pointer"
            title="Transaction Log"
            onClick={handleHistoryClick}
          />
        )}
        {props.workflow.isLogged ? (
          <UserSetting
            label={props.workflow.user.name}
            signOut={props.signOut}
          />
        ) : (
          <LoginButton />
        )}
      </div>
      <div
        className={`absolute right-[10px] md:right-0 transition-all duration-1000 flex justify-end ${isTheme2 ? "top-[30px] md:top-[60px]" : "top-[70px] md:top-[195px]"
          }`}
      >
        {/* <div className="w-[100px] md:w-[150px] mr-[20px]">
          <NetworkSwitch />
        </div> */}
        <div className="w-[60px] md:w-[100px]">
          <DarkMode />
        </div>
      </div>
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
)(MainHeader);
