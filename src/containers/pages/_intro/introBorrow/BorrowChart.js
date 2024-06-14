import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    LineController,
    BarController,
    Title,
    Tooltip,
    Legend,
    // Chart,
  } from 'chart.js';
  import InputAmount from "../../../../components/Form/InputAmount";
  import { Bar } from 'react-chartjs-2';
  import { useForm } from "react-hook-form";
  import Button from "../../../../components/Button";


import React, { useState, useEffect } from 'react';
import SelectAsset from './selectAsset';
ChartJS.register(
LinearScale,
CategoryScale,
BarElement,
PointElement,
LineElement,
LineController,
BarController,
Legend,
Tooltip
);




// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
function OneSlider(props) {
  return (
    <div className={`${props.className}`}>
      <div className='flex justify-between items-center'>
        <div className='text-[16px] text-[#797476] dark:text-[#F9D3B4] tracking-[1px]'>{props.title}</div>
        <div className='rounded-[8px] border-2 dark:border-[2px] text-[#797476] dark:text-[#728AB7] border-[#797476] bg-[#131218] shadow-lg dark:shadow-none dark:bg-[#271B2D] p-[2px] pl-[16px] pr-[16px]'>{props.value}{props.subfix}</div>
      </div>
      <input className='mt-[5px] w-full cursor-pointer' type="range" min={props.min} max={props.max} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
  )
}



function generateBorrowData(apy, deposit,borrowed) {
    // calculate time to repay deposit

    // interest is compounded yearly
    var interest = 1+apy;
    // time to repay deposit
    var time = Math.log(1+((borrowed/100)))/Math.log(interest);
    var timeyears = time;
    // generate an array of years from current year to this year + timeyears
    var timeperiod = [];
    var currentyear = new Date().getFullYear();
    for (var i = 0; i < timeyears+1; i++) {
        timeperiod[i] = currentyear + i;
    }  
    // return a dictionary of years and corresponding interest earned
    var A = [];
    timeperiod.forEach(function (item, index) {
        A[index]=(deposit*(borrowed/100))-(deposit*(1+apy)**index - deposit);
      }
    );
    return A;


};



function calculateTimePeriod(apy, deposit,borrowed) {
    // with apy and deposit, calculate the time to repay 50% of deposit
    // assuming 50% of deposit is borrowed

    // 50% of deposit is borrowed
    // interest is compounded daily
    var interest = 1+apy;
    // time to repay 50% of deposit
    var time = Math.log(1+((borrowed/100)))/Math.log(interest);
    // time in years
    var timeyears = time;

    // generate an array of years from current year to this year + timeyears
    var timeperiod = [];
    var currentyear = new Date().getFullYear();
    for (var i = 0; i < timeyears+1; i++) {
        timeperiod[i] = currentyear + i;
    }
    // console.log(timeperiod)
    return(timeperiod);

};



var BorrowChart=({apy}) => {
  const hookForm = useForm({mode: 'onChange'});
  const [ borrowed, setBorrowed ] = useState(50);
  const [deposit, setDeposit] = useState(1000);
  const [asset, setAsset] = useState('alUSD');

  if (asset == 'alUSD') {
    var apy = 0.01;
  } else if (asset == 'alETH') {
    var apy = 0.03;
  }


  
    const [state,setState] = useState({
        labels: calculateTimePeriod(apy, deposit,borrowed),
        datasets: [
          {
            type: 'bar',
            label: 'Loan Amount',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: (generateBorrowData(0.03,deposit,borrowed)),
          },
        ],
      }
      );
      
    const [minmax, setMinMax] = useState([0, deposit]);
    
    useEffect(() => {
      setMinMax([
        0, generateBorrowData(apy,deposit,borrowed).reduce((a, b) => Math.max(a, b))]);
        // console.log(minmax)
    }, [apy, deposit, borrowed]);

    var options = {
      scales: {
          y: {
          // beginAtZero: true,
          min: parseInt(minmax[0]),
          max: parseInt(minmax[1]),
          },
      },
      };
    // console.log(options.scales.y.max,deposit,apy,timeperiod);
    // console.log(ymax);
    

    useEffect(() => {
      //Deposit
      var amount =hookForm.getValues('amount');
      if (amount) {
        amount=amount.replace(/,/g, '');
        setDeposit(amount);
      }
      else {
        setDeposit(1000);
      }


      //Set duration

      // time to repay 50% of deposit
      var time = Math.log(1+((borrowed/100)))/Math.log(1+apy);
      document.getElementById('loanDuration').innerHTML = time.toFixed(2).toString()+" years";

      //Maturation date
      var currentdate = new Date();
      var maturitydate = new Date();
      maturitydate.setFullYear(currentdate.getFullYear() + time);
      document.getElementById('maturationDate').innerHTML = maturitydate.toDateString();

      //Set data on graph
        setState({
            labels: calculateTimePeriod(0.03,deposit,borrowed),
            datasets: [
              {
                type: 'bar',
                label: 'Loan Amount Left to Repay',
                backgroundColor: 'rgb(75, 192, 192)',
                data: (generateBorrowData(0.03,parseInt(deposit),borrowed)),
                borderColor: 'white',
                borderWidth: 2,
              },
            ]})
          }, [apy,deposit,borrowed]);
    

return (
  
  <div className='text-[rgba(255,255,255,0.94)]'>
  
  <div className='flex justify-center items-center'>
  <div className="mt-[4px] w-[100%] md:w-[50%] p-[10px] text-[16px] md:text-[24px] leading-[19px] text-center items-center justify-center align-items-center">
                  Enter amount
                </div>
  <InputAmount
              name="amount"
              className="mt-[4px] w-[100%] md:w-[50%] p-[10px] text-[16px] md:text-[24px] leading-[19px] text-center items-center justify-center align-items-center"
              hookForm={hookForm}
              // validate={validateAmount}
              placeholder={1000}
              value={deposit}
            />
</div>

  <SelectAsset isCrypto='True' selectedSymbol={asset} onChange={setAsset} className='p-[20px]'></SelectAsset>
  <OneSlider
        title="Borrowed:"
        min={0}
        max={50}
        value={borrowed}
        onChange={(val) => {
          // console.log('val', val);
          setBorrowed(val);
        }}
        placeholder={50}
      />


  <Bar
  //   ref={chartRef}
  //   type='bar'
    options={options}
    data={state}
  />
  </div>
)
}

export default BorrowChart;