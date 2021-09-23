import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import Axios from "axios";
import StockContext from "./Context/StockContext";
import DateContext from "./Context/DateContext";

const StockGraph = () => {
  const [stockSymbol, setstockSymbol] = useContext(StockContext);
  const [stockDate, setStockDate] = useContext(DateContext);
  const [stockChartData, setstockChartData] = useState({
    series: [],
    options: {
      selection: {
        enabled: true,
      },
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "category",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  });

  const fetchDetails = async () => {
    let temp_data = await Axios.get("http://127.0.0.1:5000/chart", {
      params: {
        symbol: stockSymbol,
        start_date: stockDate.startDate,
        end_date: stockDate.endDate,
        interval: "1d",
      },
    });
    let ob = {};
    ob.data = temp_data["data"]["data"];
    setstockChartData({
      series: [ob],
      options: {
        selection: {
          enabled: true,
        },
        chart: {
          type: "candlestick",
          height: 350,
        },
        title: {
          text: "CandleStick Chart",
          align: "left",
        },
        xaxis: {
          type: "category",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  };
  useEffect(async () => {
    fetchDetails();
  }, [stockSymbol, stockDate]);
  return (
    <Chart
      options={stockChartData.options}
      series={stockChartData.series}
      type="candlestick"
      height={350}
    />
  );
};
export default StockGraph;
