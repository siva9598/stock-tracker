import React, { useState, useEffect, useContext } from "react";
import StockContext from "./Context/StockContext";
import Axios from "axios";
import GaugeChart from "react-gauge-chart";
import "./recommendation.css";

const Recommendation = () => {
  const [stockSymbol, setstockSymbol] = useContext(StockContext);
  const [recommendation, setRecommendation] = useState({
    final_recommendation: "",
    buy_recommendation: "",
    sell_recommendation: "",
    neutral_recommendation: "",
  });

  const fetchRecommendations = async () => {
    let temp_data = await Axios.get("http://127.0.0.1:5000/recommendation", {
      params: {
        symbol: stockSymbol,
      },
    });
    let temp_recommendation = {
      final_recommendation: temp_data["data"]["RECOMMENDATION"],
      buy_recommendation: temp_data["data"]["BUY"],
      sell_recommendation: temp_data["data"]["SELL"],
      neutral_recommendation: temp_data["data"]["NEUTRAL"],
    };
    setRecommendation(temp_recommendation);
    console.log(recommendation.final_recommendation);
  };

  useEffect(async () => {
    fetchRecommendations();
  }, [stockSymbol]);
  return (
    <div>
      <h3 className="recommendation-heading">
        Recommendation:{recommendation.final_recommendation}
      </h3>

      <div className="recommendation">
        <div className="guage">
          <h3 className="guage-heading">
            Buy:{recommendation.buy_recommendation}
          </h3>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={30}
            colors={["#ff0000", "#ffff00", "#00ff00"]}
            percent={
              recommendation.buy_recommendation /
              (recommendation.buy_recommendation +
                recommendation.sell_recommendation +
                recommendation.sell_recommendation)
            }
          />
        </div>
        <div className="guage">
          <h3 className="guage-heading">
            Sell:{recommendation.sell_recommendation}
          </h3>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={30}
            colors={["#ff0000", "#ffff00", "#00ff00"]}
            percent={
              recommendation.sell_recommendation /
              (recommendation.buy_recommendation +
                recommendation.sell_recommendation +
                recommendation.sell_recommendation)
            }
          />
        </div>
        <div className="guage">
          <h3 className="guage-heading">
            Neural:{recommendation.neutral_recommendation}
          </h3>
          <GaugeChart
            id="gauge-chart2"
            nrOfLevels={30}
            colors={["#ff0000", "#ffff00", "#00ff00"]}
            percent={
              recommendation.neutral_recommendation /
              (recommendation.buy_recommendation +
                recommendation.sell_recommendation +
                recommendation.sell_recommendation)
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Recommendation;
