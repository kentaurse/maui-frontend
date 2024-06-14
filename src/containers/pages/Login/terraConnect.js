import { useWallet, WalletStatus } from "@terra-money/wallet-provider";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { apiSignIn, signOut, updateBalance } from "../../../saga/actions/workflow";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../../components/Button";
import { EXTENSION } from "../../../utils/wallet";

function TerraConnect(props) {
  const history = useHistory();
  const {
    connect,
    status,
    availableConnectTypes,
    availableInstallTypes,
    install,
    disconnect,
    wallets,
    signBytes,
  } = useWallet();

  const [ isConnecting, setIsConnecting ] = useState(false);
  const [ isGettingSignature, setIsGettingSignature ] = useState(false);
  const apiSignIn = props.apiSignIn;
  const updateBalance = props.updateBalance;
  
  useEffect(() => {
    if (isConnecting && status === WalletStatus.WALLET_CONNECTED && !isGettingSignature) { // user clicked on login button and then wallet connection has been completed from disconnected state.
      const getSignature = async () => {
        const BYTES = Buffer.from(wallets[0].terraAddress)
        try{
          const { result } = await signBytes(BYTES);
          const signature = result.signature.toString();
          console.log('getting signature done, signin...')
          connect(EXTENSION); // must be called as users can change the network.
          processSignIn(wallets[0].terraAddress, signature);
        }
        catch(e) {
          toast.error("Connecting wallet denied");
          setIsConnecting(false);
          setIsGettingSignature(false);
          // console.log('catch', e);
        }
        finally {
          return;
        }
      }
      const processSignIn = (terraAddress, signature) => {
        apiSignIn({
          url: '/signIn',
          method: 'POST',
          data: {
            terraAddress: terraAddress,
            signature: signature,
          },
          success: (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('terraAddress', terraAddress);
            localStorage.setItem('signature', signature);
            toast.success("Login Success!");
            setIsConnecting(false);
            setIsGettingSignature(false);
            updateBalance(response.mauiAddress);
            history.push('/dashboard');
          },
          fail: (error) => {
            console.log('signIn error', error);
            toast.error("Login API Failed!");
            setIsConnecting(false);
            setIsGettingSignature(false);
          }
        })
      }
      console.log('getting signature started');
      setIsGettingSignature(true);
      getSignature(); // get signature
    }
  }, [status, history, connect, isConnecting, isGettingSignature, wallets, signBytes, apiSignIn, updateBalance]);

  /**
   * Handle events
   */
  const handleClick = (e) => {
    if (props.workflow.isLogged) {
      localStorage.clear();
      disconnect();
      props.signOut();
    } else {
      switch(status) {
        case WalletStatus.WALLET_NOT_CONNECTED:
          if (availableInstallTypes.indexOf(EXTENSION) >= 0) { // should install
            install(EXTENSION);
          } else {
            if (availableConnectTypes.indexOf(EXTENSION) >= 0) { // connect
              setIsConnecting(true);
              connect(EXTENSION);
            } else {
              toast.error("Extension is not available");
            }
          }
          break;
        case WalletStatus.WALLET_CONNECTED:
          // already connected then go to getSignature directly.
          setIsConnecting(true);
          // getSignature();
          break;
        default:
          break;
      }
    }
  }
  
  /**
   * Render
   */
  const isLoading = status === WalletStatus.INITIALIZING || isConnecting;
  return (
    <Button
      className={props.className}
      onClick={handleClick}
      isLoading={isLoading}
      isDisabled={isLoading}
    >
      {props.label}
    </Button>
  );
}

export default compose(
  connect(
    state => ({
      workflow: state.workflow
    }),
    {
      apiSignIn,
      signOut,
      updateBalance,
    }
  )
)(TerraConnect);