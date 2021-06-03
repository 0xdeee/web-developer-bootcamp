// ----------------- Using XMLHttpRequest --------------------------------

const request = new XMLHttpRequest();
request.onload = function () {
  console.log('SUCCESS!');
  const response = JSON.parse(this.responseText).ticker;
  console.log(`Currently 1 ${response.base} = ${response.price} USD`);
};

request.onerror = function () {
  console.error('ERROR');
  console.error(this);
};

request.open('GET', 'https://api.cryptonator.com/api/ticker/btc-usd');
request.send();

// ------------------ Using Fetch API & Promises -------------------------------------

fetch('https://api.cryptonator.com/api/ticker/btc-usd')
  .then((response) => response.json())
  .then((response) =>
    console.log(
      `Currently 1 ${response.ticker.base} = ${response.ticker.price} USD`
    )
  )
  .catch((error) => console.error(error));

// ------------------ Using Fetch API & async/await -----------------------------------

const getBitcoinPrice = async () => {
  try {
    const res = await fetch('https://api.cryptonator.com/api/ticker/btc-usd');
    const data = await res.json();
    console.log(`Currently 1 ${data.ticker.base} = ${data.ticker.price} USD`);
  } catch (e) {
    console.error(e);
  }
};

getBitcoinPrice();

// ------------------- Using Axios & async/await ---------------------------------------

const getBitcoinPrice = async () => {
  try {
    const response = await axios.get(
      'https://api.cryptonator.com/api/ticker/btc-usd'
    );
    console.log(
      `Currently 1 ${response.data.ticker.base} = ${response.data.ticker.price} USD`
    );
  } catch (e) {
    console.error(e);
  }
};

getBitcoinPrice();
