import React, { useState, useContext } from "react";
import "./AutoCompleteSearchBox.css";
import StockContext from "./Context/StockContext";
import DateContext from "./Context/DateContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DateHelper from "./Helper/DateHelper";
//import "bootstrap/dist/css/bootstrap.css";
import { Button, ListGroup, ListGroupItem, Input } from "reactstrap";

const AutoCompleteSearchBox = () => {
  const items = ["AAPL", "MSFT", "GOOG", "AMZN", "FB"];
  const [suggestions, setSuggestions] = useState([]);

  const [stockSymbol, setstockSymbol] = useContext(StockContext);
  const [stockDate, setStockDate] = useContext(DateContext);
  const [startDate, setStartDate] = useState(stockDate.startDate_date_obj);
  const [endDate, setEndDate] = useState(stockDate.endDate_date_obj);
  let temp_text = stockSymbol;
  const [text, setText] = useState(temp_text);
  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = items.sort().filter((v) => regex.test(v));
    }
    setSuggestions(suggestions);
    setText(value);
  };
  const setSearchDates = () => {
    setStockDate({
      startDate_date_obj: startDate,
      endDate_date_obj: endDate,
      startDate: DateHelper(startDate),
      endDate: DateHelper(endDate),
    });
  };

  const suggestionSelected = (value) => {
    setstockSymbol(value);
    setText(value);
    setSuggestions([]);
  };
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ListGroup>
        {suggestions.map((item) => (
          <ListGroupItem onClick={() => suggestionSelected(item)}>
            {item}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  };
  return (
    <div className="input-section">
      <div className="AutoCompleteSearchBox">
        <Input value={text} onChange={onTextChanged} type="text" />
        {renderSuggestions()}
      </div>
      <div className="date">
        <p>From</p>
        <DatePicker
          className="date-box"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
        />
      </div>
      <div className="date">
        <p>To</p>
        <span>
          <DatePicker
            className="date-box"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
          />
        </span>
      </div>

      <Button
        color="success"
        size="sm"
        className="search-button"
        onClick={setSearchDates}
      >
        Go
      </Button>
    </div>
  );
};
export default AutoCompleteSearchBox;
