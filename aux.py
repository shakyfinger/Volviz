import yfinance as yf
import json
import pandas as pd
import numpy as np
from datetime import date
from arch import arch_model


class yfticker:
    def __init__(self, symbol):
        self.ticker = yf.Ticker(symbol)
        self.history = self.ticker.history(period='2y')
        self.isreal = True
        if self.history.empty:
            self.isreal = False

    def get_info(self):
        try:
            data = {
            'change': self.ticker.info['regularMarketChange'], 'longname': self.ticker.info['longName']
            }
            return json.dumps(data)
        except:
            data = {
            'change': self.ticker.info['regularMarketChange'], 'longname': self.ticker.info['displayName']
            }
            return json.dumps(data)

    def get_expiries(self):
        return self.ticker.options if self.isreal else None

    def get_ohlc(self):
        ohlc = self.history
        ohlc.index = ohlc.index.strftime('%Y-%m-%d')
        ohlc = ohlc[['Open', 'High', 'Low', 'Close']]
        return ohlc.to_json(orient='split')

    def gen_vol_surf(self):
        expiries = self.ticker.options

        Y=[]
        format="%Y-%m-%d"
        today=date.today()
        for expiry in expiries:
            Y.append((date.fromisoformat(expiry)-today).days)

        strike = np.empty(0)
        S=self.history['Close'].iat[-1]
        for expiry in expiries:
            arr=self.ticker.option_chain(expiry)[0]["strike"]
            strike=np.append(strike,arr)
        strike=np.unique(strike)
        X=strike/S

        n = len(expiries)
        m = len(strike)
        df = pd.DataFrame(columns=X, index=Y)
        for y in range(n):
            tmp = pd.DataFrame(self.ticker.option_chain(expiries[y])[0])
            for x in range(m):
                if not tmp.loc[tmp['strike'].isin([strike[x]])].empty:
                    df.loc[Y[y],X[x]] = tmp.loc[tmp['strike'].isin([strike[x]]), ['impliedVolatility']].iat[0,0] * 100
        df = df.astype(float)
        df = df.interpolate(method="linear", axis=1, limit_direction="both")
        return df.to_json(orient='split')

    def log_r(self):
        ohlc = self.history
        #ohlc['percent_change'] = ohlc['Close'].pct_change()*100
        ohlc['log_r'] = np.log(ohlc['Close']/ohlc['Close'].shift(1))

        df=ohlc[['log_r']]
        return df.to_json(orient='split')

    def garch(self):
        ohlc = self.history
        #ohlc['percent_change'] = ohlc['Close'].pct_change()*100
        ohlc['log_r'] = np.log(ohlc['Close']/ohlc['Close'].shift(1))

        df=ohlc[['log_r']]
        df = df.dropna()

        model = arch_model(df['log_r']*100, p=1, q=1)
        model_fit = model.fit()

        train = 90
        df['pred'] = np.nan
        for i in df.index[train:]:
            traindata = df['log_r'].loc[:i]*100
            model = arch_model(traindata, p=1, q=1)
            model_fit = model.fit(disp='off')
            pred = model_fit.forecast(horizon=1)
            df.loc[i, 'pred'] = np.sqrt(pred.variance.values[0][0]*252)/100

        #df['vol'] = np.sqrt(((df['log_r'] - df['log_r'].rolling(7).mean()))**2 * 252)
        df['vol'] = df['log_r'].rolling(7).std()*np.sqrt(252)
        df_out=df[['pred', 'vol']]
        return df_out.to_json(orient='split')




# templates/index.html
# templates/dashboard.html
# static/test.js
# volviz.py
# aux.py
