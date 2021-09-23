from flask import Flask
from flask import abort,request, jsonify
import yfinance as yf
from tradingview_ta import TA_Handler, Interval, Exchange
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/chart',methods=['GET'])
def chart():
	if((request.args.get('symbol') is None) or (request.args.get('start_date') is None) or (request.args.get('end_date') is None) or (request.args.get('interval') is None)):
		return abort(400)
	symbol = request.args.get('symbol')
	start_date = request.args.get('start_date')
	end_date = request.args.get('end_date')
	time_interval = request.args.get('interval')
	data = yf.download(tickers  = symbol,start=start_date, end=end_date, interval = time_interval)
	

	list_of_stock_data = []
	for label, content in data.iterrows():
		stock_data_dict= dict()
		temp = []
		now =label
		timestamp= str(now)
		timestamp=timestamp.strip("00:00:00")
		stock_data_dict['x'] = timestamp
		temp.append(round(float(content[0]),2))
		temp.append(round(float(content[1]),2))
		temp.append(round(float(content[2]),2))
		temp.append(round(float(content[3]),2))
		stock_data_dict['y'] = temp
		list_of_stock_data.append(stock_data_dict)
	stock_price_value = dict()
	stock_price_value["data"]= list_of_stock_data
	return jsonify(stock_price_value)

@app.route('/recommendation',methods=['GET'])
def recommendation():
	if(request.args.get('symbol') is None):
		return abort(400)
	symbol = request.args.get('symbol')
	handler = TA_Handler(
    symbol=symbol,
    exchange="NASDAQ",
    screener="america",
    interval="1d",
    timeout=None
	)
	analysis = handler.get_analysis()
	return jsonify(analysis.summary)









