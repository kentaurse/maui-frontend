import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { compose } from "redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import Input from "../../../../components/Form/Input";
import InputAmount from "../../../../components/Form/InputAmount";
import InputCryptoAmount from "../../../../components/Form/InputCryptoAmount";
import { unmaskCurrency } from "../../../../utils/masks";
import Button from "../../../../components/Button";
import AgreeWithCheckbox from "../../../../components/Form/AgreeWithCheckbox";
import {
  updateBalance,
  apiDepositSend,
  apiHistoryRecord,
} from "../../../../saga/actions/workflow";
import { appConfig } from "../../../../appConfig";
import SelectTotalCurrency from "../../../../components/Form/SelectTotalCurrency";
import {
  CURRENCY_USD,
  HISTORY_DEPOSIT_SEND,
} from "../../../../utils/appConstants";
import { set } from "lodash";

function TabSend(props) {
  // get functions to build form with useForm() hook
  const hookForm = useForm();
  const { handleSubmit, setValue } = hookForm;
  // set initial values
  const terraAddress = props.workflow.terraAddress;
  const token = localStorage.getItem("token");

  useEffect(() => {
    setValue("amount", 0);
    setValue("recipient", terraAddress);
  }, [props.data, terraAddress, setValue]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState("DAI");
  const [isFiat, setIsFiat] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [recipientInputActive, setRecipientInputActive] = useState(false);
  const [inputError, setInputError] = useState(null);
  const [tmpRecipients, setTmpRecipient] = useState([]);
  const [selectedSource, setSelectedSource] = useState("DAI");
  const [selectedDest, setSelectedDest] = useState("DAI");
  const [selectedDestination, setSelectedDestination] = useState("user");

  const timer = useRef(null);

  // const depositSend = async (amount, recipient, memo, to) => {
  //   setIsLoading(true);
  //   props.apiDepositSend({
  //     url: "/send",
  //     method: "POST",
  //     data: {
  //       amount: amount,
  //       recipient: recipient,
  //       memo: memo,
  //       network: props.workflow.network,
  //     },
  //     success: (response) => {
  //       setIsLoading(false);
  //       resetForm();
  //       props.updateBalance(to);
  //       props.apiHistoryRecord({
  //         url: "/recordHistory",
  //         method: "POST",
  //         data: {
  //           type: HISTORY_DEPOSIT_SEND,
  //           terraAddress: recipient,
  //           mauiAddress: to,
  //           amount: amount,
  //           currency: CURRENCY_USD,
  //           network: `${props.workflow.network.name}:${props.workflow.network.chainID}`,
  //           note: "DONE",
  //         },
  //         success: (res) => {
  //           console.log("recordSuccess", res);
  //         },
  //         fail: (error) => {
  //           console.log("recordError", error);
  //         },
  //       });
  //       toast.success("Transaction success");
  //     },
  //     fail: (error) => {
  //       props.updateBalance(to);
  //       console.log("error", error);
  //       setIsLoading(false);
  //       toast.error("Transaction fail");
  //     },
  //   });
  // };

  function handleCryptoFiatChange(symbol) {
    setSelectedFiat(symbol);
  }
  function handleAgreeChange(e) {
    setIsAgreed(e.target.checked);
  }
  function validateAmount(val) {
    const value = unmaskCurrency(val);
    if (!value) {
      return "This input field is required.";
    } else if (parseInt(value) <= 0 || parseInt(value) > 99999) {
      return "The amount must be between $0.1 and $99,999";
    }
    return null;
  }

  // handle functions
  const resetForm = () => {
    setValue("amount", 0);
    setIsAgreed(false);
  };

  const searchUser = async (keyword) => {
    if (keyword)
      axios
        .post(`${appConfig.apiUrl}/v1/users/searchuser`, { keyword })
        .then((result) => {
          console.log(result.data);
          setTmpRecipient(result.data);
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err.response?.data?.msg);
          setIsLoading(false);
        });
    else setTmpRecipient([]);
  };

  const handleRecipient = (e) => {
    setRecipient(e.target.value);
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => searchUser(e.target.value), 500);
  };

  const handleRecipientWallet = (e) => {
    setRecipient(e.target.value);
  };

  function handleSourceChange(symbol) {
    console.log(symbol);
    setSelectedSource(symbol);
  }

  function handleDestChange(symbol) {
    console.log(symbol);
    setSelectedDest(symbol);
  }

  const onSubmit = (data) => {
    if (!props.workflow.isLogged) {
      toast.error("Please login first.");
      return false;
    }
    if (recipient === "") {
      setInputError("This input field is required.");
      return false;
    }
    setIsLoading(true);

    axios({
      method: "POST",
      headers: { Authorization: `bearer ${token}` },
      data: {
        method: selectedDestination,
        recipient,
        sourceAmount: unmaskCurrency(data.amount),
        sourceCurrency: selectedSource,
        destCurrency: selectedDest,
        memo: data.memo,
      },
      url: `${appConfig.apiUrl}/v1/transferasset`,
    })
      .then((result) => {
        console.log(result.data); // ...
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.msg);
        setIsLoading(false);
      });
  };
  return (
    <form
      className="flex p-10 md:p-20 justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full md:w-[60%] m-auto">
        <div
          className="mt-[30px] dark:text-[#fff]"
          onChange={(e) => {
            console.log(e.target.value);
            setRecipient("");
            if (e.target.value === "user") {
              setSelectedDestination("user");
            } else {
              setSelectedDestination("wallet");
            }
            setIsFiat(!isFiat);
          }}
        >
          <input
            type="radio"
            id="user"
            name="payment"
            value={"user"}
            defaultChecked
          />
          <label htmlFor="user" className="ml-[10px]">
            User
          </label>
          <div className="h-[20px]"></div>
          <input type="radio" id="wallet" name="payment" value={"wallet"} />
          <label htmlFor="wallet" className="ml-[10px]">
            Wallet
          </label>
        </div>
        <div className="mt-[20px] md:mt-[40px] ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
          Recipient (
          {selectedDestination === "user" ? "Mail Address" : "Wallet Address"})
        </div>
        {selectedDestination === "user" ? (
          <input
            className={`border-0 dark:border ${
              inputError
                ? "border-[1px] border-[#ff0000] focus:border-[#ff0000]"
                : "border-[#1199FA] focus:border-[#1199FA]"
            } rounded-[13px] w-full h-[46px] p-3 outline-none mt-[13px] bg-[#FFFFFF] dark:bg-transparent text-black dark:text-white dark:bg-[#32283C] transition-all duration-500`}
            value={recipient}
            onChange={handleRecipient}
            onFocus={() => setRecipientInputActive(true)}
            onBlur={() => setTimeout(() => setRecipientInputActive(false), 200)}
          />
        ) : (
          <input
            className={`border-0 dark:border ${
              inputError
                ? "border-[1px] border-[#ff0000] focus:border-[#ff0000]"
                : "border-[#1199FA] focus:border-[#1199FA]"
            } rounded-[13px] w-full h-[46px] p-3 outline-none mt-[13px] bg-[#FFFFFF] dark:bg-transparent text-black dark:text-white dark:bg-[#32283C] transition-all duration-500`}
            value={recipient}
            onChange={handleRecipientWallet}
          ></input>
        )}
        {recipientInputActive && tmpRecipients.length > 0 && (
          <div className="p-[10px] bg-[#fff] rounded-[13px]">
            {tmpRecipients.map((tmp, idx) => {
              return (
                <div
                  key={idx}
                  className="py-[10px] cursor-pointer"
                  onClick={() => setRecipient(tmp.email)}
                >
                  {tmp.email}
                </div>
              );
            })}
          </div>
        )}
        {inputError && (
          <div className="ml-[15px] text-[#d71f28] text-xs mt-2">
            {inputError}
          </div>
        )}
        {/* <Input
          name="recipient"
          className="mt-[60px] md:mt-[40px]"
          label={
            <div className="ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
              Recipient (Mail Address)
            </div>
          }
          hookForm={hookForm}
          registerOptions={{ required: "This field is required." }}
        /> */}

        {/* {!isFiat && (
          <InputCryptoAmount
            name="amount"
            className="mt-[40px]"
            label={
              <div className="ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
                How much would you like to{" "}
                <span className="font-bold text-[#FF1C1C]">Send</span>?
              </div>
            }
            hookForm={hookForm}
            validate={validateAmount}
            selectedCurrency={selectedFiat}
            isCurrencySelectable={true}
            onCurrencyChange={handleCryptoFiatChange}
          />
        )} */}
        <SelectTotalCurrency
          isCrypto={false}
          className="mt-[40px] md:mt-[30px]"
          label={
            <div className="text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
              Select currency you want to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] font-bold">
                send
              </span>
            </div>
          }
          selectedSymbol={selectedSource}
          onChange={handleSourceChange}
        />
        <SelectTotalCurrency
          isCrypto={false}
          className="mt-[40px] md:mt-[30px]"
          label={
            <div className="text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
              Select currency you want to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2] font=bold">
                Receive
              </span>
            </div>
          }
          selectedSymbol={selectedDest}
          onChange={handleDestChange}
        />
        <InputAmount
          name="amount"
          className="mt-[40px]"
          label={
            <div className="ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
              Amount
            </div>
          }
          hookForm={hookForm}
          validate={validateAmount}
          selectedCurrency={selectedFiat}
          // isCurrencySelectable={true}
          onCurrencyChange={handleCryptoFiatChange}
        />
        <Input
          name="memo"
          className="mt-[40px]"
          label={
            <div className="ml-[15px] text-[#273855] dark:text-[#F9D3B4] text-[13px] md:text-[16px] transition-all duration-1000">
              Memo <span className="text-[#888]">(optional)</span>
            </div>
          }
          hookForm={hookForm}
        />
        {/* <div className='ml-5 mt-[30px]'>
          <div className='flex text-[14px] items-center'>
            <div className='text-[#6B8CFF]'>Fee</div>
            <div className='ml-[10px] text-black dark:text-white text-[16px] font-semibold'>4</div>
          </div>
          <div className='flex text-[14px] items-center'>
            <div className='text-[#6B8CFF]'>Balance</div>
            <div className='ml-[10px] text-black dark:text-white text-[16px] font-semibold'>3,545.635.48</div>
          </div>
          <div className='flex text-[14px] items-center'>
            <div className='text-[#6B8CFF]'>Balance after Tax</div>
            <div className='ml-[10px] text-black dark:text-white text-[16px] font-semibold'>3,545.635.48</div>
          </div>
        </div> */}
        <AgreeWithCheckbox
          className="ml-2 md:ml-4 mb-3 mt-[30px]"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
        <Button
          type="submit"
          isDisabled={!isAgreed}
          isLoading={isLoading}
          className="mt-[10px] bg-earn-withdraw-card-btn shadow-main-card-btn rounded-[26px] text-[14px] md:text-[20px] text-[#F0F5F9] tracking-[3px] p-2 w-full"
        >
          Send
        </Button>
      </div>
    </form>
  );
}

export default compose(
  connect(
    (state) => ({
      workflow: state.workflow,
    }),
    {
      apiDepositSend,
      apiHistoryRecord,
      updateBalance,
    }
  )
)(TabSend);
