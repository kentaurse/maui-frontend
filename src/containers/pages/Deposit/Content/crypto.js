import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { compose } from "redux";
import { connect } from "react-redux";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
// import { useWallet } from "@terra-money/wallet-provider";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
} from "react-plaid-link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CountryDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import PlaidButton from "plaid-threads/Button";

import { getPaymentMethod } from "../../../../saga/actions/workflow";
import InputAmount from "../../../../components/Form/InputAmount";
import SelectCurrency from "../../../../components/Form/SelectCurrency";
import SelectWallet from "../../../../components/Form/SelectWallet";
import SelectTotalCurrency from "../../../../components/Form/SelectTotalCurrency";
import { unmaskCurrency } from "../../../../utils/masks";
import Button from "../../../../components/Button";
import RightBar from "./rightbar";
import { depositCrypto } from "../../../../utils/wallet";
import AgreeWithCheckbox from "../../../../components/Form/AgreeWithCheckbox";
import {
  apiHistoryRecord,
  updateBalance,
} from "../../../../saga/actions/workflow";
import {
  CURRENCY_USD,
  HISTORY_DEPOSIT_CRYPTO,
} from "../../../../utils/appConstants";
import { appConfig } from "../../../../appConfig";
import { shortenAddress } from "../../../../utils/shortenAddress";

function TabCrypto(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const paymentMethod = useSelector((state) => state.workflow.paymentMethod);
  const walletAddress = useSelector((state) => state.workflow.walletAddress);

  // const { sign } = useWallet();
  // get functions to build form with useForm() hook
  const hookForm = useForm();
  const { handleSubmit, setValue } = hookForm;
  // set initial values
  useEffect(() => {
    setValue("amount", 0);
  }, [props.data, setValue]);
  const token = localStorage.getItem("token");

  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("USD");
  const [selectedCurrencyDest, setSelectedCurrencyDest] = useState("USD");
  const [selectedCryptoDest, setSelectedCryptoDest] = useState("DAI");
  const [selectedCryptoWallet, setSelectedCryptoWallet] =
    useState("Debit Card");
  // const [ selectedCryptoFiat, setSelectedCryptoFiat ] = useState('USD');
  const [stage, setStage] = useState(0);
  const [reservation, setReservation] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [number, setNumber] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street1, setStreet1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [dest, setDest] = useState("");
  const [received, setReceived] = useState("");
  const [testCountry, setTestCountry] = useState("");
  const [isFiat, setIsFiat] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [paymentModalStage, setPaymentModalStage] = useState(0);
  const [isPlaidPayment, setIsPlaidPayment] = useState(true);
  //add payment method
  const [firstNameOnAccount, setFirstNameOnAccount] = useState("");
  const [lastNameOnAccount, setLastNameOnAccount] = useState("");
  const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [beneficiaryCity, setBeneficiaryCity] = useState("");
  const [beneficiaryPostal, setBeneficiaryPostal] = useState("");
  const [beneficiaryPhoneNumber, setBeneficiaryPhoneNumber] = useState("");
  const [beneficaryState, setBeneficaryState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [beneficiaryDobDay, setBeneficiaryDobDay] = useState("");
  const [beneficiaryDobMonth, setBeneficiaryDobMonth] = useState("");
  const [beneficiaryDobYear, setBeneficiaryDobYear] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [addPayLoading, setAddPayLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [copied, setCopied] = useState(false);
  const [bankDocument, setBankDocument] = useState({});
  const [fileName, setFileName] = useState("");
  const [currentPayMethod, setCurrentPayMethod] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [linkToken, setLinkToken] = useState("");
  const [accessInfo, setAccessInfo] = useState({});

  useEffect(() => {
    if (stage === 1) {
      const user = JSON.parse(localStorage.getItem("user"));
      setGivenName(user.firstName || '');
      setFamilyName(user.lastName || '');
      setTestCountry(user.country || '');
      setState(user.state || '');
      setCity(user.city || '');
      setStreet1(user.street || '');
      setPostalCode(user.postalCode || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');

      if(user.country) {
        const countryShortName = CountryRegionData.filter(
          (country) => {
            return country[0] === user.country
          }
        );
        setCountry(countryShortName[0][1]);
      }
    }
  }, [stage])

  useEffect(() => {
    if (paymentModalStage === 1) {
      const user = JSON.parse(localStorage.getItem("user"));
      setFirstNameOnAccount(user.firstName || '');
      setLastNameOnAccount(user.lastName || '');
      setBeneficiaryAddress(user.street || '');
      setDateOfBirth(user.dateOfBirth || "");
      setBeneficaryState(user.state || "");
      setBeneficiaryCity(user.city || '');
      setBeneficiaryPostal(user.postalCode || '');
      setBeneficiaryPhoneNumber(user.phone || '');

    }
  }, [paymentModalStage]);

  axios.defaults.baseURL = appConfig.apiUrl;
  axios.defaults.headers.common["Authorization"] = token;

  const onSuccess = React.useCallback(
    (public_token, metadata) => {
      console.log("public token", public_token);
      setPaymentModalShow(false);
      toast.success("Wait for a few seconds until new payment method will be created.");
      // send public_token to server
      const setToken = async () => {
        const response = await axios({
          method: "POST",
          headers: {
            Authorization: `bearer ${token}`,
          },
          data: {
            public_token: `${public_token}`,
            accountId: metadata.account_id,
          },
          url: `${appConfig.apiUrl}/v1/plaid/set_processor_token`,
        })
          .then((res) => {
            // setAccessInfo(res.data.processor_token);
            setCurrentPayMethod(res.data?.payId);
            dispatch(getPaymentMethod(res.data?.payId));
          })
          .catch((err) => {
            console.log(err);
          });
        // if (!response.ok) {
        //   dispatch({
        //     type: "SET_STATE",
        //     state: {
        //       itemId: `no item_id retrieved`,
        //       accessToken: `no access_token retrieved`,
        //       isItemAccess: false,
        //     },
        //   });
        //   return;
        // }
        // const data = await response.json();
        // dispatch({
        //   type: "SET_STATE",
        //   state: {
        //     itemId: data.item_id,
        //     accessToken: data.access_token,
        //     isItemAccess: true,
        //   },
        // });
      };
      setToken();
      dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
      window.history.pushState("", "", "/");
    },
    [dispatch]
  );

  let isOauth = false;
  const config = {
    token: linkToken,
    onSuccess,
  };

  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (linkToken && isPlaidPayment && paymentModalShow) {
      let link = document.getElementById("plaid");
      link.click();
      open();
    }
  }, [linkToken]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setBankDocument(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (reservation.length > 0) setStage(1);
  }, [reservation]);

  useEffect(() => {
    if (received !== "") setStage(2);
  }, [received]);

  useEffect(() => {
    if (paymentModalShow) document.body.style.overflow = "hidden";
    else {
      document.body.style.overflow = "auto";
      setPaymentModalStage(0);
    }
  }, [paymentModalShow]);

  useEffect(() => {
    if (paymentMethod.length > 0)
      axios({
        method: "GET",
        headers: { Authorization: `bearer ${token}` },
        url: `${appConfig.apiUrl}/v1/getpaymethods`,
      })
        .then((result) => {
          setPaymentMethods(result.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
  }, [paymentMethod]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCopied(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    if (isOauth && ready) {
      console.log("here");
      open();
    }
  }, [ready, open, isOauth]);

  function handleCryptoChange(symbol) {
    console.log(symbol);
    setSelectedCrypto(symbol);
  }
  function handleCryptoDestChange(symbol) {
    console.log(symbol);
    setSelectedCryptoDest(symbol);
  }
  function handleCurrencyDestChange(symbol) {
    console.log(symbol);
    setSelectedCurrencyDest(symbol);
  }
  function handleCryptoWalletChange(symbol) {
    console.log(symbol);
    setSelectedCryptoWallet(symbol);
  }
  // function handleCryptoFiatChange(symbol) {
  //   setSelectedCryptoFiat(symbol);
  // }
  function handleAgreeChange(e) {
    setIsAgreed(e.target.checked);
  }

  const handleUpload = async () => {
    setIsUploading(true);
    const currentSrn = paymentMethods.filter(
      (paymethod) => paymethod.id === currentPayMethod
    );
    if (currentSrn.length === 0) {
      setIsUploading(false);
      toast.success("Wait for a few seconds.");
      return;
    }
    let formData = new FormData();
    formData.append("bankdoc", bankDocument);
    formData.append("srn", currentSrn[0].srn);

    await axios
      .post(`${appConfig.apiUrl}/v1/uploaddoc`, formData, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.data.status === "PENDING") {
          toast.success("Document is successfully uploaded. Wait.");
          let tmpPaymentMethods = paymentMethods;
          for (let i = 0; i < tmpPaymentMethods.length; i++) {
            if (tmpPaymentMethods[i].id === currentPayMethod) {
              tmpPaymentMethods[i].status = "PENDING";
              setPaymentMethods(tmpPaymentMethods);
              break;
            }
          }
          setPaymentModalShow(!paymentModalShow);
        } else {
          toast.error("Server Error. Try again.");
        }
        setIsUploading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.msg);
        setIsUploading(false);
      });
  };

  function validateAmount(val) {
    const value = unmaskCurrency(val);
    if (!value) {
      return "This input field is required.";
    } else if (parseInt(value) <= 5 || parseInt(value) > 99999) {
      return "The amount must be greater than $5 and be less than $100000";
    }
    return null;
  }
  // handle functions
  const resetForm = () => {
    setValue("amount", 0);
    setIsAgreed(false);
  };
  const onSubmit = (data) => {
    if (!props.workflow.isLogged) {
      toast.error("Please login first.");
      return false;
    }
    if (selectedCryptoWallet === "ACH Transfer" && paymentMethods.length === 0) {
      toast.error("First Select Payment Methods.");
      return;
    }

    setAmount(unmaskCurrency(data.amount));
    if (unmaskCurrency(data.amount) >= 5) setIsLoading(true);
    // const from = props.workflow.terraAddress;
    // const to = props.workflow.mauiAddress;
    // const network = props.workflow.network;
    // deposit(unmaskCurrency(data.amount), from, to, network);
    // return false;

    if (!isFiat && selectedCryptoWallet === "Debit Card") {
      //crypto & debit card method
      axios({
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        data: {
          amount: unmaskCurrency(data.amount),
          paymentMethod: 0,
          sourceCurrency: selectedCrypto,
          destCurrency: isFiat ? selectedCurrencyDest : selectedCryptoDest,
        },
        url: `${appConfig.apiUrl}/v1/reserve`,
      })
        .then((result) => {
          // const url = result.data?.url || "";
          const reserve = result.data.reservation;
          setReservation(reserve);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.msg);
          setIsLoading(false);
        });
    } else if (isFiat && selectedCryptoWallet === "Debit Card") {
      //crypto & debit card method
      axios({
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        data: {
          amount: unmaskCurrency(data.amount),
          paymentMethod: 0,
          sourceCurrency: selectedCrypto,
          destCurrency: isFiat ? selectedCurrencyDest : selectedCryptoDest,
        },
        url: `${appConfig.apiUrl}/v1/reserveforfiat`,
      })
        .then((result) => {
          // const url = result.data?.url || "";
          const reserve = result.data.reservation;
          setReservation(reserve);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.msg);
          setIsLoading(false);
        });
    } else if (isFiat && selectedCryptoWallet === "ACH Transfer") {
      //crypto & debit card method
      axios({
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        data: {
          srn: paymentMethods[selectedPayment].srn,
          sourceAmount: unmaskCurrency(data.amount),
          sourceCurrency: selectedCrypto,
          destCurrency: isFiat ? selectedCurrencyDest : selectedCryptoDest,
        },
        url: `${appConfig.apiUrl}/v1/fiatfrombank`,
      })
        .then((result) => {
          console.log(result.data); // ...
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.msg);
          setIsLoading(false);
        });
    } else if (!isFiat && selectedCryptoWallet === "ACH Transfer") {
      //crypto & debit card method
      axios({
        method: "POST",
        headers: { Authorization: `bearer ${token}` },
        data: {
          srn: paymentMethods[selectedPayment].srn,
          sourceAmount: unmaskCurrency(data.amount),
          sourceCurrency: selectedCrypto,
          destCurrency: isFiat ? selectedCurrencyDest : selectedCryptoDest,
        },
        url: `${appConfig.apiUrl}/v1/cryptofrombank`,
      })
        .then((result) => {
          console.log(result.data); // ...
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response?.data?.msg);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  const onInfoSubmit = () => {
    if (!props.workflow.isLogged) {
      toast.error("Please login first.");
      return false;
    }
    setIsLoading(true);
    axios({
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      data: {
        isFiat,
        reservationId: reservation,
        number: 4111111111111111,
        year: 2023,
        month: 10,
        cvv: 555,
        givenName: "Jaim",
        familyName: "Samith",
        email: "wando0226@gmail.com",
        phone: 12199644724,
        street1: "132 Test Ave",
        city: "Los Angeles",
        state: "CA",
        postalCode: 94123,
        country,
        amount,
        destCurrency: isFiat ? selectedCurrencyDest : selectedCryptoDest,
        sourceCurrency: selectedCrypto,
      },
      url: `${appConfig.apiUrl}/v1/order`,
    })
      .then((result) => {
        const tmpDest = result.data.dest.split("0x");
        setDest(`0x${tmpDest[1]}`);
        setReceived(result.data.purchaseAmount);
        console.log(result)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err.response?.data?.msg);
        toast.error(err.response?.data?.msg);
        setIsLoading(false);
      });
  };

  const handleAddPayment = () => {
    if (!props.workflow.isLogged) {
      toast.error("Please login first.");
      return false;
    }
    setAddPayLoading(true);
    axios({
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      data: {
        firstNameOnAccount: "sally",
        lastNameOnAccount: "smith",
        beneficiaryAddress: "1234 Main St",
        beneficiaryCity: "Los Angeles",
        beneficiaryPostal: "91604",
        beneficiaryPhoneNumber: "15555555555",
        beneficaryState: "CA",
        beneficiaryDobDay: 2,
        beneficiaryDobMonth: 12,
        beneficiaryDobYear: 1990,
        accountNumber: "1234567890123",
        routingNumber: "123412312",
        accountType: 0,
        // firstNameOnAccount,
        // lastNameOnAccount,
        // beneficiaryAddress,
        // beneficiaryCity,
        // beneficiaryPostal,
        // beneficiaryPhoneNumber,
        // beneficaryState,
        // beneficiaryDobDay,
        // beneficiaryDobMonth,
        // beneficiaryDobYear,
        // accountNumber,
        // routingNumber,
        // accountType: 0,
      },
      url: `${appConfig.apiUrl}/v1/createPayMethod`,
    })
      .then((result) => {
        console.log(result.data);
        setCurrentPayMethod(result.data?.payId);
        dispatch(getPaymentMethod(result.data?.payId));
        setAddPayLoading(false);
        setPaymentModalStage(2);
      })
      .catch((err) => {
        console.log("error", err.response?.data?.msg);
        toast.error(err.response?.data?.msg);
        setAddPayLoading(false);
      });
  };

  const deletePaymentMethod = (index) => {
    axios({
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      data: { srn: paymentMethods[selectedPayment].srn },
      url: `${appConfig.apiUrl}/v1/deletepaymethod`,
    })
      .then((result) => {
        if (result.data?.msg === "success")
          axios({
            method: "GET",
            headers: { Authorization: `bearer ${token}` },
            url: `${appConfig.apiUrl}/v1/getpaymethods`,
          })
            .then((res) => {
              console.log(res);
              setPaymentMethods(res.data);
              toast.success("Successfully removed");
            })
            .catch((err) => {
              console.log("error", err);
            });
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handlePlaidMethod = () => {
    axios({
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      url: `${appConfig.apiUrl}/v1/plaid/create_link_token`,
    })
      .then((result) => {
        // const url = result.data?.url || "";
        setLinkToken(result.data.link_token);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
        setIsLoading(false);
      });
  };
  return stage === 0 ? (
    <>
      <form
        className="flex p-10 md:p-20 flex-col-reverse md:flex-row justify-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full md:w-[45%]">
          <div
            className="dark:text-[#fff]"
            onChange={(e) => {
              console.log(e.target.value);
              // if (e.target.value === "fiat") {
              //   setSelectedCryptoWallet("ACH Transfer");
              // } else {
              //   setSelectedCryptoWallet("Debit Card");
              // }
              setSelectedCryptoWallet("Debit Card");
              setIsFiat(!isFiat);
            }}
          >
            <input
              type="radio"
              id="crypto"
              name="payment"
              value={"crypto"}
              defaultChecked
            />
            <label htmlFor="crypto" className="ml-[10px]">
              Crypto
            </label>
            <div className="h-[20px]"></div>
            <input type="radio" id="fiat" name="payment" value={"fiat"} />
            <label htmlFor="fiat" className="ml-[10px]">
              Fiat
            </label>
            {/* {!isFiat && (
              <div className="md:mt-[10px]">
                Wallet address: {" "}
                <CopyToClipboard
                  text={walletAddress}
                  onCopy={() => setCopied(true)}
                >
                  <span className="cursor-pointer">
                    {shortenAddress(walletAddress)}
                  </span>
                </CopyToClipboard>
                {copied ? (
                  <span className="ml-[15px] text-[#1199fa]">Copied.</span>
                ) : null}
              </div>
            )} */}
          </div>
          <SelectCurrency
            isCrypto={false}
            className="mt-[40px] md:mt-[30px]"
            label={
              <div className="text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
                Select currency in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#f00c0c]">
                  External Bank
                </span>
              </div>
            }
            selectedSymbol={selectedCrypto}
            onChange={handleCryptoChange}
          />
          <SelectCurrency
            isCrypto={isFiat ? false : true}
            className="mt-[40px] md:mt-[30px]"
            label={
              <div className="text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
                {`Select ${isFiat ? "currency" : "crypto"} you want to`}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#f00c0c]">
                  Receive
                </span>
              </div>
            }
            selectedSymbol={isFiat ? selectedCurrencyDest : selectedCryptoDest}
            onChange={
              isFiat ? handleCurrencyDestChange : handleCryptoDestChange
            }
          />
          <div className="h-[30px]"></div>
          <SelectWallet
            tab="deposit"
            isCrypto={isFiat ? false : true}
            className="mt-[10px]"
            label={
              <div className="relative text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000 flex justify-between">
                <div>Payment Method</div>
                <div
                  className="mr-[16px] cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#f00c0c]"
                  onClick={() => history.push("/fees")}
                >
                  Fees
                </div>
              </div>
            }
            selectedSymbol={selectedCryptoWallet}
            onChange={handleCryptoWalletChange}
          />
          <InputAmount
            name="amount"
            className="mt-[40px]"
            label={
              <div className="ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
                Enter amount
              </div>
            }
            hookForm={hookForm}
            validate={validateAmount}
          />
          <AgreeWithCheckbox
            className="ml-2 md:ml-4 mb-3 mt-[30px]"
            checked={isAgreed}
            onChange={handleAgreeChange}
          />
          <Button
            isDisabled={!isAgreed}
            isLoading={isLoading}
            className="mt-[10px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full"
          >
            Continue
          </Button>
        </div>
        <div className="w-full mt-[30px] md:mt-0 md:w-[45%]">
          {selectedCryptoWallet === "Debit Card" ? (
            <RightBar isCrypto={true} />
          ) : (
            <div className="w-full border-b-[1px] border-b-[#777] pb-[10px] md:pb-0 md:border-0">
              <div className="md:text-[24px] dark:text-[#fff]">
                Payment Method
              </div>
              <div className="md:max-h-[608px] md:overflow-auto">
                {paymentMethods.length > 0 &&
                  paymentMethods.map((payment, index) => (
                    <div
                      key={index}
                      className={`md:w-full h-[110px] md:h-[120px] md:mt-[10px] p-[6px] dark:text-[#fff] rounded-[10px] cursor-pointer ${selectedPayment === index
                        ? " border-[3px] border-[#1199FA]"
                        : ""
                        }`}
                      onClick={() => setSelectedPayment(index)}
                    >
                      <div className="relative h-[100%] flex items-center justify-between">
                        <div
                          className="absolute right-0 top-0"
                          onClick={() => deletePaymentMethod(index)}
                        >
                          🗑️
                        </div>
                        <div className="text-center w-[80%]">
                          {payment.name}
                        </div>
                        {payment.status === "AWAITING_FOLLOWUP" && (
                          <div className="text-center text-[10px] overflow-hidden px-[10px] py-[5px] rounded-[30px] bg-orange-500 text-[#FFF]">
                            awaiting
                          </div>
                        )}
                        {payment.status === "PENDING" && (
                          <div className="text-center text-[10px] overflow-hidden px-[10px] py-[5px] rounded-[30px] bg-teal-400 text-[#FFF]">
                            pending
                          </div>
                        )}
                        {payment.status === "ACTIVE" && (
                          <div className="text-center text-[10px] overflow-hidden px-[10px] py-[5px] rounded-[30px] bg-[#1199FA] text-[#FFF]">
                            active
                          </div>
                        )}
                        {payment.status === "REJECTED" && (
                          <div className="text-center text-[10px] overflow-hidden px-[10px] py-[5px] rounded-[30px] bg-red-800 text-[#FFF]">
                            rejected
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div
                className="relative mt-[10px] bg-deposit-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full text-center cursor-pointer"
                onClick={() => {
                  handlePlaidMethod();
                  setPaymentModalShow(!paymentModalShow);
                }}
              >
                + New Payment Method
              </div>
            </div>
          )}
        </div>
      </form>
      {paymentModalShow && (
        <div>
          <div className="fixed left-0 md:left-[50vw] top-0 w-full md:w-[50vw] h-[100vh] bg-deposit-card dark:bg-deposit-card-dark z-[60]">
            <div className="mt-[30px] flex justify-between md:h-[50px]">
              <div className="flex justify-center items-center text-[30px] text-[#000] dark:text-[#FFF] font-[600] w-[90%] h-[100%]">
                Payment Method
              </div>
              <div
                className="flex justify-center items-center h-[100%] text-[30px] md:text-[40px] dark:text-[#FFF] w-[15%] md:w-[10%] cursor-pointer"
                onClick={() => setPaymentModalShow(false)}
              >
                &times;
              </div>
            </div>
            {paymentModalStage === 0 ? (
              <div className="h-[calc(100vh-50px)] md:w-full flex justify-center items-center">
                <div className="h-[400px] flex flex-col justify-between">
                  {/* <div
                    className={`w-[300px] h-[150px] rounded-[15px] dark:text-[#fff] ${
                      isPlaidPayment
                        ? "border-[2px] border-[#1199FA]"
                        : "border-[1px] border-[#555555]"
                    } flex justify-center items-center cursor-pointer`}
                    onClick={() => setIsPlaidPayment(true)}
                  >
                    Plaid
                  </div> */}
                  <Button
                    className={`!w-[300px] h-[150px] rounded-[15px] dark:text-[#fff] ${isPlaidPayment
                      ? "border-[2px] border-[#1199FA]"
                      : "border-[1px] border-[#555555]"
                      } flex justify-center items-center cursor-pointer`}
                    type="button"
                    id="plaid"
                    onClick={() => {
                      setIsPlaidPayment(true);
                      //open();
                    }}
                    isDisabled={!linkToken || !ready}
                  >
                    Plaid
                  </Button>
                  <div
                    className={`h-[150px] rounded-[15px] dark:text-[#fff] ${!isPlaidPayment
                      ? "border-[2px] border-[#1199FA]"
                      : "border-[1px] border-[#555555]"
                      } flex justify-center items-center cursor-pointer`}
                    onClick={() => setIsPlaidPayment(false)}
                  >
                    Bank Transfer
                  </div>
                  <div
                    className="relative mt-[10px] bg-deposit-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full text-center cursor-pointer"
                    onClick={() => {
                      if (!isPlaidPayment) setPaymentModalStage(1);
                      else {
                        open();
                        //handlePlaidMethod();
                      }
                    }}
                  >
                    NEXT
                  </div>
                </div>
              </div>
            ) : paymentModalStage === 1 ? (
              <div className="md:h-[calc(100vh-50px)] md:w-full px-[30px] dark:text-[#FFF] overflow-auto">
                <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
                  <div className="md:w-[45%]">
                    <div>First Name*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                      value={firstNameOnAccount}
                      onChange={(e) => setFirstNameOnAccount(e.target.value)}
                    />
                  </div>
                  <div className="md:w-[45%]">
                    <div>Last Name*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                      value={lastNameOnAccount}
                      onChange={(e) => setLastNameOnAccount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:mt-[10px]">Address*</div>
                <input
                  type="text"
                  className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
                  value={beneficiaryAddress}
                  onChange={(e) => setBeneficiaryAddress(e.target.value)}
                />
                <div className="mt-[10px] flex flex-col md:flex-row md:justify-between">
                  <div className="md:w-[45%]">
                    <div className="md:mt-[10px]">Account Number*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </div>
                  <div className="md:w-[45%]">
                    <div className="md:mt-[10px]">Routing Number*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value)}
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
                        let tmpDate = e.target.value.split("-");
                        setBeneficiaryDobYear(tmpDate[0]);
                        setBeneficiaryDobMonth(tmpDate[1]);
                        setBeneficiaryDobDay(tmpDate[2]);
                      }}
                    />
                  </div>
                  <div className="md:w-[45%]">
                    <div>State*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] border-transparent transition-all duration-100  text-[#000]"
                      value={beneficaryState}
                      onChange={(e) => setBeneficaryState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
                  <div className="md:w-[45%]">
                    <div>City*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
                      value={beneficiaryCity}
                      onChange={(e) => setBeneficiaryCity(e.target.value)}
                    />
                  </div>
                  <div className="md:w-[45%]">
                    <div>Postal / ZIP code*</div>
                    <input
                      type="text"
                      className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
                      value={beneficiaryPostal}
                      onChange={(e) => setBeneficiaryPostal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:h-[10px]"></div>
                <PhoneInput
                  specialLabel="Phone Number*"
                  inputClass="w-[100%] rounded-[12px] border-transparent  text-[#000]"
                  country={"us"}
                  value={beneficiaryPhoneNumber}
                  onChange={(phone) => {
                    setBeneficiaryPhoneNumber(phone);
                  }}
                />
                <Button
                  isLoading={addPayLoading}
                  className="mt-[10px] md:mt-[20px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full"
                  onClick={handleAddPayment}
                >
                  NEXT
                </Button>
              </div>
            ) : (
              <div className="md:h-[calc(100vh-50px)] md:w-full px-[30px] dark:text-[#FFF] flex justify-center items-center overflow-auto">
                <div className="md:w-[300px] pb-[10vw]">
                  <div
                    {...getRootProps()}
                    className="h-[150px] text-[16px] text-center border-[1px] border-[#050505] border-dashed color-[#050505] rounded-[10px] flex items-center justify-center hover:cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the document here ...</p>
                    ) : (
                      <p>Drag document here, or click to select document.</p>
                    )}
                  </div>
                  <div className="text-[16px] text-center">{fileName}</div>
                  <div className="mt-[10px] text-[14px] text-center">
                    Upload document to activate your acocunt
                  </div>
                  <Button
                    isLoading={isUploading}
                    className="md:mt-[20px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div
            className="fixed left-0 top-0 w-[100vw] h-[100vh] bg-[#fff] z-[10] opacity-80"
            onClick={() => setPaymentModalShow(false)}
          ></div>
        </div>
      )}
    </>
  ) : stage === 1 ? (
    <form
      className="flex p-10 md:p-20 flex-col-reverse md:flex-row justify-between text-[#273855] dark:text-[#FFF]"
      onSubmit={handleSubmit(onInfoSubmit)}
    >
      <div className="w-full md:w-[45%]">
        {/* <div className="md:mt-[20px]">You deposited {amount} DAI</div> */}
        <div className="md:mt-[10px]">Card Info</div>

        <div className="md:mt-[10px]">Card Number*</div>
        <input
          type="text"
          className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
          <div className="md:w-[45%]">
            <div>Expiration*</div>
            <input
              type="date"
              className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
              onChange={(e) => {
                let tmpDate = e.target.value.split("-");
                setYear(tmpDate[0]);
                setMonth(tmpDate[1]);
              }}
            />
          </div>
          <div className="md:w-[45%]">
            <div>CVV*</div>
            <input
              type="password"
              autoComplete="off"
              className="w-[100%] text-[#000] rounded-[12px] border-transparent transition-all duration-100"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <div className="md:mt-[20px]">Personal Info</div>
        <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
          <div className="md:w-[45%]">
            <div>First Name*</div>
            <input
              type="text"
              className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
              value={givenName}
              onChange={(e) => setGivenName(e.target.value)}
            />
          </div>
          <div className="md:w-[45%]">
            <div>Last Name*</div>
            <input
              type="text"
              className="w-[100%] rounded-[12px] text-[#000] border-transparent transition-all duration-100"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
        </div>
        <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
          <div className="md:w-[45%]">
            <div>Country*</div>
            {/* <input
              type="text"
              className="md:w-[100%] rounded-[12px] border-transparent transition-all duration-100"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            /> */}
            <CountryDropdown
              className="w-[100%] rounded-[12px] border-transparent text-[#000]"
              value={testCountry}
              onChange={(val) => {
                const countryShortName = CountryRegionData.filter(
                  (country) => {
                    console.log(country[1])
                    return country[0] === val
                  }
                );
                setTestCountry(val);
                setCountry(countryShortName[0][1]);
              }}
            />
          </div>
          <div className="md:w-[45%]">
            <div>State*</div>
            <input
              type="text"
              className="w-[100%] rounded-[12px] border-transparent transition-all duration-100  text-[#000]"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="md:mt-[10px]">Address*</div>
        <input
          type="text"
          className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
          value={street1}
          onChange={(e) => setStreet1(e.target.value)}
        />
        <div className="md:mt-[10px] flex flex-col md:flex-row md:justify-between">
          <div className="md:w-[45%]">
            <div>Postal / ZIP code*</div>
            <input
              type="text"
              className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="md:w-[45%]">
            <div>City*</div>
            <input
              type="text"
              className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="md:mt-[20px]">Contact</div>
        <div className="md:mt-[10px]">Email*</div>
        <input
          type="text"
          className="w-[100%] rounded-[12px] border-transparent transition-all duration-100 text-[#000]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="md:h-[10px]"></div>
        <PhoneInput
          specialLabel="Phone Number*"
          inputClass="w-[100%] rounded-[12px] border-transparent  text-[#000]"
          country={"us"}
          value={phone}
          onChange={(phone) => {
            setPhone(phone);
          }}
        />
        <Button
          type="submit"
          isLoading={isLoading}
          className="mt-[10px] md:mt-[20px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full"
        >
          Deposit
        </Button>
      </div>
      <div className="w-full mt-[10px] md:mt-0 md:w-[45%]">
        {<RightBar isCrypto={true} />}
      </div>
    </form>
  ) : (
    <div className="flex p-10 md:p-20 flex-col-reverse md:flex-row justify-between dark:text-[#FFF]">
      <div className="w-full md:w-[45%] text-[12px] md:text-[16px]">
        <div className="md:mt-[10px] flex justify-between">
          <div className="md:w-[45%]">
            <div>Sent to</div>
          </div>
          <div className="md:w-[45%]">
            <div>{shortenAddress(dest)}</div>
          </div>
        </div>
        <div className="md:mt-[20px] flex justify-between">
          <div className="md:w-[45%]">
            <div>{selectedCryptoDest} Received</div>
          </div>
          <div className="md:w-[45%]">
            <div>{received + " " + selectedCryptoDest}</div>
          </div>
        </div>
        <div className="md:mt-[20px] flex justify-between">
          <div className="md:w-[45%]">
            <div>Wyre fees</div>
          </div>
          <div className="md:w-[45%]">
            <div>{amount - received}</div>
          </div>
        </div>
        <div className="md:mt-[20px] flex justify-between">
          <div className="md:w-[45%]">
            <div>Total USD paid</div>
          </div>
          <div className="md:w-[45%]">
            <div>USD {amount}</div>
          </div>
        </div>
        <div
          className="md:mt-[20px] bg-deposit-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full cursor-pointer flex justify-center items-center"
          onClick={() => setStage(0)}
        >
          OK
        </div>
      </div>
      <div className="w-full mt-[10px] md:mt-0 md:w-[45%]">
        <RightBar isCrypto={true} />
      </div>
    </div>
  );
}

export default compose(
  connect(
    (state) => ({
      workflow: state.workflow,
    }),
    {
      apiHistoryRecord,
      updateBalance,
    }
  )
)(TabCrypto);
