from flask import Flask, render_template, request
from markupsafe import escape
import aux
import time

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dash():
    sym = request.args.get("symbol","")
    ticker = aux.yfticker(escape(sym))
    if ticker.isreal:
        #return render_template("dashboard1.html")
        return render_template("dashboard.html", symbol=sym, info=ticker.get_info(), ohlcjson=ticker.get_ohlc(), surf=ticker.gen_vol_surf(), log_r=ticker.log_r(), garch=ticker.garch())
    else:
        return render_template("index.html", symbol=sym)

if __name__ == "__main__":
    app.run()
