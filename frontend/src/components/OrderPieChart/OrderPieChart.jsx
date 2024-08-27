
import React, { useContext ,useState,useEffect} from 'react'
import './OrderPieChart.css'
import axios from 'axios';
import {Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
import { storeContext } from '../../context/storeContext';
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderPieChart = () => {
    const [data, setData] = useState(null);
    const {url} = useContext(storeContext);

  useEffect(() => {
    axios.get(url+"api/order/list")
      .then(response => {
        const orders = response.data.data;
        console.log("Response for chart:",orders);
        
        const categoryCount = {};

        
        orders.forEach(order => {
          order.items.forEach(item => {
            const catagory = item.catagory; 

            if (categoryCount[catagory]) {
              categoryCount[catagory] += 1;
            } else {
              categoryCount[catagory] = 1;
            }
          });
        });

        const labels = Object.keys(categoryCount);
        const values = Object.values(categoryCount);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Top Selling Categories',
              data: values,
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#808000',
                '#FFC0CB'
              ],
              hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#808000',
                '#FFC0CB'
              ]
            }
          ]
        });
      })
      .catch(error => {
        console.error("There was an error fetching the orders data!", error);
      });
  }, []);
  return (
  <div className="chart-container">
    <h2 className="chart-title">Top Selling Brands Analysis</h2>
    <div className='chart-details'>
       {data ? <Pie className='pie' data={data} /> : <div className="chart-loading">Loading...</div>}
    </div>
   
  </div>
  )
}

export default OrderPieChart

