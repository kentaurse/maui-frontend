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
import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { min, toInteger } from 'lodash';
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
const labels = [2022, 2023, 2024, 2025, 2026, 2027, 2028];


function generateEarnData(apy, timepoints, deposit) {
    // loop through timepoints
    var A = [];
    timepoints.forEach(function (item, index) {
        A[index]=deposit*(1+apy)**(index);
      });
      return A;
};


   var EarnChart=({apy, timeperiod, deposit}) => {
    // data.labels = timeperiod;
    // data.datasets[0].data = generateEarnData(apy,timeperiod,deposit);
    // data.datasets[1].data = generateEarnData(apy,timeperiod,deposit);
    // console.log("data is ",totalIncome,Balance,Expenses)

    const [state,setState] = useState({
        timeperiod,
        datasets: [
          {
            type: 'bar',
            label: 'With Other Banks',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            fill: false,
            data: (generateEarnData(0.01,timeperiod,deposit)),
          },
          {
            type: 'bar',
            timeperiod: 'Expected Earnings',
            backgroundColor: 'rgb(75, 192, 192)',
            data: (generateEarnData(apy,timeperiod,deposit)),
            borderColor: 'white',
            borderWidth: 2,
          },
        ],
      }
      );
      
    const [minmax, setMinMax] = useState([0, 3000]);
    
    useEffect(() => {
      setMinMax([
        deposit, generateEarnData(apy,timeperiod,deposit).reduce((a, b) => Math.max(a, b))]);
    }, [apy, timeperiod, deposit]);

    const options = {
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
        setState({
            labels: timeperiod,
            datasets: [
              {
                type: 'bar',
                label: 'With Other Banks',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                fill: false,
                data: (generateEarnData(0.01,timeperiod,deposit)),
              },
              {
                type: 'bar',
                label: 'Expected Earnings',
                backgroundColor: 'rgb(75, 192, 192)',
                data: (generateEarnData(apy,timeperiod,deposit)),
                borderColor: 'white',
                borderWidth: 2,
              },
            ]})
          }, [apy,timeperiod,deposit]);
    
    

return (
<Bar
    //   ref={chartRef}
    //   type='bar'
      options={options}
      data={state}
    />)
}

export default EarnChart;