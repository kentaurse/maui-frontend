import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { apiSignIn, apiGoogleSignIn } from "../../../saga/actions/workflow";
import Button from "../../../components/Button";

import GoogleButton from "../../../components/Button/GoogleButton";

function SignIn(props) {
  const history = useHistory();
  const [status, setStatus] = useState("signin");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const apiSignIn = props.apiSignIn;
  const apiGoogleSignIn = props.apiGoogleSignIn;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/dashboard");
    }
  }, [history]);
  function handleGoBack() {
    history.push("/dashboard");
  }

  function handleReset() {
    setUserName("");
    setEmail("");
    setPassword("");
  }

  function handleSignIn() {
    setIsLoading(true);
    apiSignIn({
      url: "/v1/auth/login",
      method: "POST",
      data: {
        email,
        password
      },
      success: (response) => {
        console.log(response)
        localStorage.setItem("token", response.tokens.access.token);
        localStorage.setItem("refreshToken", response.tokens.refresh.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success("Login Success!");
        handleReset();
        setIsLoading(false);
        history.push("/dashboard");
      },
      fail: (error) => {
        setIsLoading(false);
        toast.error(error.data?.message);
      },
    });
  }

  function handleSignUp() {
    if (password !== confirmPassword) {
      toast.error("Password is not match");
      return;
    }
    setIsLoading(true);
    apiSignIn({
      url: "/v1/auth/register",
      method: "POST",
      data: {
        name: userName,
        email,
        password,
      },
      success: (response) => {
        localStorage.setItem("token", response.tokens.access.token);
        localStorage.setItem("refreshToken", response.tokens.refresh.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        
        toast.success("Successfully registerd!");
        handleReset();
        setIsLoading(false);
        // history.push("/dashboard");
      },
      fail: (error) => {
        setIsLoading(false);
        toast.error(error.data?.message);
      },
    });
  }

  const handleGoogleSignIn = async (res) => {
    try {
      console.log(res);
      setIsGoogleLoading(true);
      apiGoogleSignIn({
        url: "/v1/auth/google-login",
        method: "POST",
        data: {
          email: res?.email
        },
        success: (response) => {
          if (response.msg) {
            toast.error(response.msg);
          } else {
            localStorage.setItem("token", response.tokens.access.token);
            localStorage.setItem("refreshToken", response.tokens.refresh.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            console.log(response)
            toast.success("Login Success!");
          }
          handleReset();
          setIsGoogleLoading(false);
          if (!response.msg) history.push("/dashboard");
        },
        fail: (error) => {
          setIsGoogleLoading(false);
          toast.error(error.data?.message);
        },
      });
    } catch {
      toast.error("You did not register.");
    }

  };

  const handleGoogleSignUp = async (res) => {
    try {
      setIsGoogleLoading(true);
      console.log(res.sub)
      apiGoogleSignIn({
        url: "/v1/auth/google-signup",
        method: "POST",
        data: {
          email: res?.email,
          name: res?.name,
          password: res?.sub,
          firstName: res?.given_name,
          lastName: res?.family_name
        },
        success: (response) => {
          if (response.msg) {
            toast.error(response.msg);
          } else {
            localStorage.setItem("token", response.tokens.access.token);
            localStorage.setItem("refreshToken", response.tokens.refresh.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            toast.success("SingUp Success!");
          }
          handleReset();
          setIsGoogleLoading(false);
          if (!response.msg) history.push("/dashboard");
        },
        fail: (error) => {
          setIsGoogleLoading(false);
          toast.error(error.data?.message);
        },
      });
    } catch {
      toast.error("You did not register.");
    }


  };

  return (
    <div className="relative w-full min-h-[900px] md:min-h-[1000px] bg-login-background dark:bg-login-background-dark transition-all duration-1000">
      {/* bg images */}
      <div className="mix-blend-luminosity dark:mix-blend-normal bg-login-leftbottom bg-center bg-cover absolute left-0 bottom-0 w-[206px] h-[201px] md:w-[412px] md:h-[402px]"></div>
      <div className="mix-blend-luminosity dark:mix-blend-normal bg-login-middletop bg-center bg-cover absolute left-0 md:left-[25%] top-0 w-[135px] h-[63px] md:w-[270px] md:h-[125px]"></div>
      <div className="mix-blend-luminosity dark:mix-blend-normal bg-login-middlemiddle bg-center bg-cover absolute left-0 md:left-[20%] top-[40%] w-[170px] h-[155px] md:w-[339px] md:h-[309px]"></div>
      <div className="mix-blend-luminosity dark:mix-blend-normal bg-login-middlebottom bg-center bg-cover absolute left-0 md:left-[30%] bottom-[10%] w-[197px] h-[185px] md:w-[393px] md:h-[370px]"></div>
      <div className="mix-blend-luminosity dark:mix-blend-normal bg-login-righttop bg-center bg-cover absolute right-[5%] top-[10%] w-[300px] h-[310px] md:w-[669px] md:h-[623px]"></div>
      <div className="mix-blend-luminosity dark:mix-blend-normal bg-login-rightbottom bg-center bg-cover absolute right-0 bottom-0 w-[300px] h-[175px] md:w-[662px] md:h-[347px]"></div>
      <span
        onClick={handleGoBack}
        className="absolute top-[40px] left-[calc(50%-160px)] md:top-[calc(50%-480px)] md:left-[calc(50%-450px)] text-[30px] cursor-pointer text-[#FFFFFF] dark:text-[#FFFFFF]"
      >
        &lt;
      </span>
      <div className="absolute w-[320px] h-[750px] left-[calc(50%-160px)] top-[90px] md:w-[900px] md:h-[840px] md:top-[calc(50%-430px)] md:left-[calc(50%-450px)] bg-[#5882C140] dark:bg-[#FFFFFF1A] backdrop-blur-[25px] border-[3px] border-[#5882C1] dark:border-[#FFFFFFB0] rounded-[40px] p-[20px] text-center">
        <div
          className="bg-splash-logo dark:bg-splash-logo-dark bg-center bg-cover w-[120px] h-[40px] transition-all duration-1000 cursor-pointer"
          onClick={handleGoBack}
        />
        <div className="mt-[40px] md:mt-[70px] text-[14px] leading-[21px] md:text-[28px] md:leading-[42px] text-[#FFFFFF] font-semibold text-center tracking-[4px] login-text-shadow">
          We offer{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1199FA] to-[#00DDA2]">
            Revolutionary Banking
          </span>
          <br />
          services based on blockchain.
        </div>
        <div className="mt-[50px] tracking-[1px] text-[12px] md:text-[24px] text-[#FFFFFF] dark:text-[#C9C0C0] font-semibold text-center">
          Please access your account on blockchain
        </div>
        <div className="mt-[15px] md:mt-[30px] w-[60%] mx-auto h-[50px] text-[#FFF] flex flex-row rounded-[4px] cursor-pointer">
          <div
            className={`w-[80px] md:w-[120px] h-[40px] md:h-[50px] flex justify-center items-center text-[16px] md:text-[20px] ${status === "signin"
              ? "bg-[rgba(255,255,255,0.21)] border-b-[2px]"
              : ""
              } hover:border-b-[1px] border-[#1199FA] cursor-pointer transition-[background] duration-500`}
            onClick={() => {
              handleReset();
              setStatus("signin");
            }}
          >
            SignIn
          </div>
          <div
            className={`w-[80px] md:w-[120px] h-[40px] md:h-[50px] flex justify-center items-center text-[16px] md:text-[20px] ${status === "signup"
              ? "bg-[rgba(255,255,255,0.21)] border-b-[2px]"
              : ""
              } hover:border-b-[1px] border-[#1199FA] cursor-pointer transition-[background] duration-500`}
            onClick={() => {
              handleReset();
              setStatus("signup");
            }}
          >
            SignUp
          </div>
        </div>
        <div className="mt-[10px] w-[100%] md:w-[60%] mx-auto flex flex-col">
          {status === "signup" && (
            <>
              <div className="flex text-[#FFF] mb-[10px]">username</div>
              <input
                className="h-[40px] w-[100%] md:w-[300px] border-[] rounded-[10px]"
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </>
          )}
          <div className="flex text-[#FFF] mb-[10px]">email</div>
          <input
            className="h-[40px] w-[100%] md:w-[300px] border-[] rounded-[10px]"
            type="text"
            placeholder="Enter mail address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="mt-[10px] flex text-[#FFF] mb-[10px]">password</div>
          <input
            className="h-[40px] w-[100%] md:w-[300px] border-[] rounded-[10px]"
            type="password"
            autoComplete="off"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {status === "signup" && (
            <>
              <div className="flex text-[#FFF] mb-[10px]">confirm password</div>
              <input
                className="h-[40px] w-[100%] md:w-[300px] border-[] rounded-[10px]"
                type="password"
                placeholder="Enter username"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </>
          )}
          {status === "signin" ? (
            <>
              <Button
                isLoading={isLoading}
                className="mt-[30px] mx-auto md:mx-0 flex w-[240px] md:w-[300px] h-[40px] md:h-[40px] justify-center items-center text-[#FFF] text-[12px] md:text-[18px] font-[500] rounded-[10px] md:rounded-[14px] bg-[#1199FA] cursor-pointer"
                onClick={handleSignIn}
              >
                SignIn
              </Button>
              <GoogleButton 
                className="mt-[30px] mx-auto md:mx-0 flex w-[240px] md:w-[300px] h-[40px] md:h-[40px] justify-center items-center text-[#FFF] text-[12px] md:text-[18px] font-[500] rounded-[10px] md:rounded-[14px] bg-[#1199FA] cursor-pointer"
                isLoading={isGoogleLoading}
                handleSuccess={handleGoogleSignIn}
              >
                Sign In with Google
              </GoogleButton>
            </>
          ) : (
            <>
              <Button
                isLoading={isLoading}
                className="mt-[12px] mx-auto md:mx-0 flex w-[240px] md:w-[300px] h-[30px] md:h-[40px] justify-center items-center text-[#FFF] text-[12px] md:text-[18px] font-[500] rounded-[10px] md:rounded-[14px] bg-[#1199FA] cursor-pointer"
                onClick={handleSignUp}
              >
                SignUp
              </Button>
              <GoogleButton 
                className="mt-[30px] mx-auto md:mx-0 flex w-[240px] md:w-[300px] h-[40px] md:h-[40px] justify-center items-center text-[#FFF] text-[12px] md:text-[18px] font-[500] rounded-[10px] md:rounded-[14px] bg-[#1199FA] cursor-pointer"
                isLoading={isGoogleLoading}
                handleSuccess={handleGoogleSignUp}
              >
                Sign Up with Google
              </GoogleButton>
            </>
          )}
          {/* <a href="localhost:4000/google/auth" class="btn btn-danger"><span class="fa fa-google"></span> SignIn with Google</a> */}
        </div>
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
      apiSignIn,
      apiGoogleSignIn,
    }
  )
)(SignIn);
