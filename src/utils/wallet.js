import { LCDClient, Dec, MsgSend } from "@terra-money/terra.js";
import { appConfig } from "../appConfig";

export const EXTENSION = 'EXTENSION';
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const getTerraClient = (network) => {
  return new LCDClient({
    URL: network ? network.lcd : appConfig.lcdURL,
    chainID: network ? network.chainID : appConfig.lcdChainId,
  });
}
const isMainNet = (network) => {
  return network && network.name === 'mainnet';
}

export const fetchBalance = async (address, network) => {
  // this one should be called to refresh the amount as terra.bank.balance is not being updated well.
  // await terra.wasm.contractQuery(appConfig.marketAddress, { epoch_state: { block_height: undefined } }) //balance: { address: address }

  // we need to call terra.bank.balance twice to solve the issue
  // console.log('fetch', address, network);
  const terra = getTerraClient(network);
  await terra.bank.balance(address);
  await sleep(3000);
  const currentBalance = await terra.bank.balance(address);
  console.log('balance', currentBalance);
  const uusdAmount = currentBalance[0]._coins.uusd?.amount;
  if (uusdAmount) {
    return new Dec(currentBalance[0]._coins.uusd.amount)
      .div(1000000)
      .toNumber()
      .toFixed(2);
  } else {
    return 0;
  }
};

export const fetchExpectedInterest = async (mauiAddress, network, callback) => {
  // aUST balance
  const terra = getTerraClient(network);
  const austTokenAddress = isMainNet(network) ? appConfig.austTokenAddress_main: appConfig.austTokenAddress_test;
  const marketAddress = isMainNet(network) ? appConfig.marketAddress_main : appConfig.marketAddress_test;
  const oracleAddress = isMainNet(network) ? appConfig.oracleAddress_main : appConfig.oracleAddress_test;
  const uaUST = new Promise((resolve, reject) => {
    resolve(
      terra.wasm.contractQuery(
        austTokenAddress,
        {
          balance: {
            address: mauiAddress,
          },
        },
      ),
    );
  });

  const exchangeRate = new Promise((resolve, reject) => {
    resolve(
      terra.wasm.contractQuery(
        marketAddress,
        {
          epoch_state: {
            block_height: undefined,
          },
        },
      ),
    );
  });

  const depositRate = new Promise((resolve, reject) => {
    resolve(
      terra.wasm.contractQuery(
        oracleAddress,
        {
          epoch_state: {
            block_height: undefined,
          },
        },
      ),
    );
  });
  await Promise.all([uaUST, exchangeRate, depositRate])
    .then((values) => {
      const ustBalance = new Dec(values[0].balance).mul(
        values[1].exchange_rate,
      );

      const annualizedInterestRate = new Dec(values[2].deposit_rate)
        .mul(appConfig.BLOCKSPERYEAR)
        .sub(appConfig.mauiFee);

      const interest = ustBalance
        .mul(annualizedInterestRate)
        .div(appConfig.MICRO)
        .toNumber();
      // console.log("aust", values[0].balance, values[1].exchange_rate);
      callback({
        exchangeRate: values[1].exchange_rate,
        austVal: values[0].balance,
        annualExpectedInterest: interest,
        depositedAmount: new Dec(values[0].balance)
          .mul(values[1].exchange_rate)
          .div(appConfig.MICRO)
          .toFixed(2)
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const depositCrypto = async (amount, from, to, network, sign, callbackSuccess, callbackError) => {
  const terra = getTerraClient(network);
  try {
    const pool_contract = new MsgSend(from, to, {
      uusd: new Dec(amount).mul(appConfig.MICRO).toNumber(),
    });
  
    // Sign transaction
    const result = await sign({
      msgs: [pool_contract],
      feeDenoms: ["uusd"],
      gasPrices: "0.15uusd",
    });
  
    const tx = result.result;
  
    await terra.tx.broadcast(tx);
    callbackSuccess();
  } catch(error) {
    callbackError(error);
  }
  
}