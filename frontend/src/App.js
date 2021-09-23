import React, { useState } from "react";
import StockContext from "./Context/StockContext";
import DateContext from "./Context/DateContext";
import AutoCompleteSearchBox from "./AutoCompleteSearchBox";
import StockGraph from "./StockGraph";
import Recommendation from "./Recommendation";
import DateHelper from "./Helper/DateHelper";
import "./App.css";

const App = () => {
  const StockHook = useState("AAPL");
  let currentStartDate = new Date();
  currentStartDate.setMonth(currentStartDate.getMonth() - 3);
  let startDate = DateHelper(currentStartDate);
  let currentEndDate = new Date();
  let endDate = DateHelper(currentEndDate);
  // console.log(endDate);
  const DateHook = useState({
    startDate: startDate,
    endDate: endDate,
    startDate_date_obj: currentStartDate,
    endDate_date_obj: currentEndDate,
  });
  // const DateHook = useState({
  //   startDate: year + "-" + (month - 2) + "-" + day,
  //   endDate: year + "-" + month,
  // });

  return (
    <StockContext.Provider value={StockHook}>
      <DateContext.Provider value={DateHook}>
        <div class="container">
          <AutoCompleteSearchBox class="elements" className="search-box" />
          <StockGraph class="elements" className="graph" />
          <Recommendation class="elements" className="recommendation" />
        </div>
      </DateContext.Provider>
    </StockContext.Provider>
  );
};

export default App;
