const frontbutton = document.getElementsByClassName("frontbutton")
const backbutton = document.getElementsByClassName("backbutton")

for (let i = 0; i<frontbutton.length; i++) {
  frontbutton[i].addEventListener("click", e => {
    frontbutton[i].parentElement.parentElement.parentElement.style.transform = "rotateX(180deg)";})
}

for (let i = 0; i<backbutton.length; i++) {
  backbutton[i].addEventListener("click", e => {
    backbutton[i].parentElement.parentElement.parentElement.style.transform = "rotateX(0deg)";})
}

const iv_desc = document.getElementById("iv_desc")
iv_desc.textContent = "This plot of volatility levels across a grid of moneyness and time-to-expiration maturities provides a visualization of market skew and term structure of implied volatility. Only implied volatility values of Call options are plotted. The range of strike prices of traded options vary with expiry, thus the normalized quantity 'moneyness' is used where moneyness = strike/price and values greater than 1 represent in-the-money options and vice versa. Linear interpolation is used to fill missing data for the plot." 

const logr_desc = document.getElementById("logr_desc")
logr_desc.textContent = "Commonly observed characteristics of volatility includes clustering (where periods of higher volatility tend to cluster together and periods of lower volatility tend to cluster together), mean reversion (where volatility tends to revert back to its long term mean), and heavy-tailed distrubution of returns. This Log return plot serves as a visual assesment of the previously stated characteristics to determine its suitability as an input into the GARCH model."

const garch_desc = document.getElementById("garch_desc")
garch_desc.textContent = "The Generalized Autoregressive Conditional Heteroskedasticity (GARCH) model is commonly used in volatility modeling as its autoregressive component is able to capture clustering of high and low volatility as well as time-varying conditional variance, unlike in other models where volatility is commonly assumed to be constant, namely the classic Black-Scholes model. This plot shows the backward-looking realized 7-day rolling volatily against forward looking rolling GARCH model predictions for volatility. Predictions are obtained in a rolling fashion where the model is retrained after the introduction of subsequent days data."
