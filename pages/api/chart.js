export const getBitconData = async () => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=zar&days=100&interval=daily`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getEthereumData = async () => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=zar&days=100&interval=daily`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUSDCData = async () => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/usd-coin/market_chart?vs_currency=zar&days=100&interval=daily`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getDogeCoinData = async () => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/dogecoin/market_chart?vs_currency=zar&days=100&interval=daily`);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};
