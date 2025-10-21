console.log('linked correctly') 

window.onload = () => {
  const trans_el = document.querySelector('.transition');
  const search = document.querySelector('form');
  const b = document.querySelector('.back');


  setTimeout(() => {
    trans_el.classList.remove('is-active');
  }, 100); 

  b.addEventListener('click', e => {
    e.preventDefault();
    trans_el.classList.add('is-active');

  setTimeout(() => {
    window.location.href = b.href;
  }, 100); 
  });

  search.addEventListener('submit', e => {
    e.preventDefault();
    trans_el.classList.add('is-active');

    setTimeout(() => {
      search.submit();
    }, 100)

  });

}

function test(inpt) {
  console.log(inpt);
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function resize() {
      Plotly.Plots.resize('candlestick'); 
      Plotly.Plots.resize('surf'); 
      Plotly.Plots.resize('log_r'); 
}

function info(json) {
  const i = JSON.parse(json);
  const change = i["change"];

  document.getElementById("long").textContent = i["longname"]
  const e = document.getElementById("change");
  e.textContent = change + '%';
  if (change>=0) {
    e.style.color = '#3D9970'
    e.textContent = '+' + change + '%';
  } else {
    e.style.color = "#FF4136"
    e.textContent = change + '%';
  };
}

function candle(json) {
  const ohlc = JSON.parse(json);
  const o = [];
  const h = [];
  const l = [];
  const c = [];

  ohlc["data"].forEach(element => {
    o.push(element[0]);
    h.push(element[1]);
    l.push(element[2]);
    c.push(element[3]);
  });

  const trace = {
    x: ohlc['index'],
    open: o,
    high: h,
    low: l,
    close: c,
    type: 'candlestick',
    increasing: {fillcolor: "#3D9970"},
    decreasing: {fillcolor: "#FF4136"}
  }

  const data = [trace];

  const layout = {
    showlegend: false,
    autossize: false,
    paper_bgcolor: '#35384a',
    plot_bgcolor: '#35384a',
    font: {color: 'white'},
    xaxis: {gridcolor: 'white'},
    yaxis: {gridcolor: 'white'},
    margin: {
      b: 40,
      l: 40,
      r: 0,
      t: 0
    },
    xaxis: {
      rangeslider: {
      visible: false
      }
    }
  };

  const config = {responsive:true};
  Plotly.newPlot("candlestick", data, layout, config);
};

function surf(json) {
  const iv = JSON.parse(json);
  const moneyness =  iv['columns'];
  const days = iv['index'];

  const z_data = iv["data"]
  const data = [{
    z: z_data,
    x: moneyness,
    y: days,
    type:'surface'
  }];

  const layout = {
    paper_bgcolor: '#2B2E3D',
    plot_bgcolor: '#2B2E3D',
    font: {color: 'white'},
    showscale: false,
    autossize: false, 
    margin: {
      b: 40,
      l: 40,
      r: 0,
      t: 0
    },
    scene: {
      xaxis: {title: {text: 'Moneyness'},
              color: 'white'},
      yaxis: {title: {text: 'Days to expiry'},
              color: 'white'},
    }
  };
  const config = {responsive:true};
  
  Plotly.newPlot('surf', data, layout, config);
}

function log_r(json) {
  const raw = JSON.parse(json);
  const r = [];

  raw["data"].forEach(element => {
    r.push(element[0]);
  });

  const trace = {
    x: raw["index"],
    y: r,
    type: 'scatter'
  };
  const data = [trace];
  const layout = {
    autossize: false,
    paper_bgcolor: '#2B2E3D',
    plot_bgcolor: '#2B2E3D',
    font: {color: 'white'}, 
    xaxis: {color: 'white'},
    yaxis: {color: 'white'},
    margin: {
      b: 40,
      l: 40,
      r: 0,
      t: + 0
    },
  };
  const config = {responsive:true};
  Plotly.newPlot('log_r', data, layout, config);

}

function garch(json) {
  const raw = JSON.parse(json);
  const pred = [];
  const vol = [];

  raw["data"].forEach(element => {
    pred.push(element[0]);
    vol.push(element[1]);
  });

  const trace1 = {
    x: raw["index"],
    y: pred,
    type: 'scatter',
    name: 'GARCH rolling predictions'
  };
  const trace2 = {
    x: raw["index"],
    y: vol,
    type: 'scatter',
    name: '7-day rolling volatility'
  };
  const layout = {
    autossize: false,
    paper_bgcolor: '#2B2E3D',
    plot_bgcolor: '#2B2E3D',
    font: {color: 'white'}, 
    xaxis: {color: 'white'},
    yaxis: {color: 'white'},
    margin: {
      b: 40,
      l: 40,
      r: 0,
      t: 0
    },
  };
  const data = [trace1, trace2];
  const config = {responsive:true};
  Plotly.newPlot('garch', data, layout, config);

}


