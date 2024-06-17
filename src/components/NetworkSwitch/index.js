import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Toggle from '../Toggle';
import { updateNetwork, updateBalance } from "../../saga/actions/workflow";

function NetworkSwitch(props) { 
  const [label, setLabel] = useState('TestNet');
  const network = props.workflow?.network;
  useEffect(() => {
    if (network) {
      setLabel(network.name === 'testnet' ? 'TestNet': 'MainNet');
    }
  }, [network]);
  const handleCheckChange = (e) => {
    if (!e.target.checked) {
      props.updateNetwork({
        chainID: "bombay-12",
        lcd: "https://bombay-lcd.terra.dev",
        mantle: "https://bombay-mantle.terra.dev",
        name: "testnet",
        walletconnectID: 0,
      });
    } else {
      props.updateNetwork({
        chainID: "columbus-5",
        lcd: "https://lcd.terra.dev",
        mantle: "https://mantle.terra.dev",
        name: "mainnet",
        walletconnectID: 1,
      });
    }
    if (props.workflow.mauiAddress){
      props.updateBalance(props.workflow.mauiAddress);
    }
  }

  return (
    <Toggle id="testnet" label={label} defaultChecked={false} handleCheckChange={handleCheckChange}/>
  )
}

export default compose(
  connect(
    state => ({
      workflow: state.workflow
    }),
    {
      updateBalance,
      updateNetwork
    }
  )
)(NetworkSwitch);