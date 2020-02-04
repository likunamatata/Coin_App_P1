const button = document.querySelector("button");
const dropdown = document.querySelector("select");
let selected_currency;
const base_url = `https://api.coingecko.com/api/v3/coins`;



currency_list = [
  "aed", "ars", "aud", "bch", "bdt", "bhd", "bmd", "bnb", "brl", "btc", "cad", "chf", "clp", "cny",
  "czk", "dkk", "eos", "eth", "eur", "gbp", "hkd", "huf", "idr", "ils", "inr", "jpy", "krw", "kwd", "lkr", "ltc",
  "mmk", "mxn", "myr", "nok", "nzd", "php", "pkr", "pln", "rub", "sar", "sek", "sgd", "thb", "try", "twd", "uah",
  "usd", "vef", "vnd", "xag", "xau", "xdr", "xlm", "xrp", "zar"
];

const currency_dropdown = () => {
  for (let i = 0; i < currency_list.length; i++) {
    dropdown.innerHTML += `<option id=${currency_list[i].toUpperCase()}>${currency_list[i].toUpperCase()}</option>`
  };
}

currency_dropdown();


//Fields I want to show

//coin description
let logos = document.querySelector('#logos');
let abb_names = document.querySelector('#abb_names');
let names = document.querySelector('#abb_names');;
//current value
let current_price = [];
let market_cap = [];
//last 24hr price range
let high_24h = [];
let low_24h = [];
//history
let price_change_percentage_24h = [];
let price_change_percentage_7d = [];
let price_change_percentage_30d = [];
let price_change_percentage_1y = [];


const pop_column = (column, value) => {
  let new_element = document.createElement('li');
  new_element.innerHTML = `<a>${value}</a>`;
  column.appendChild(new_element);
}



//Fields populated for a given currency
const pop_dashboard = async (currency) => {
  let response = await axios.get(`${base_url}`)
    .then(response => {
      for (let i = 0; i < response.data.length; i++) {
        //coin description
        let logo_value = response.data[i].image.thumb;
        let logo = document.createElement('li');
        logo.innerHTML = `<img src=${logo_value}>`;
        logos.appendChild(logo);
        

        let abb_name_value = response.data[i].symbol;
        pop_column(abb_names, abb_name_value);







        name.push(response.data[i].name);

        //lower case currency because the dropdown is all caps
        let cur = currency.toLowerCase();
        let mkt_data = response.data[i].market_data;

        //current value
        current_price.push(mkt_data.current_price[cur]);
        market_cap.push(mkt_data.market_cap[cur]);

        //last 24hr price range
        high_24h.push(mkt_data.high_24h[cur]);
        low_24h.push(mkt_data.low_24h[cur]);

        //history
        price_change_percentage_24h.push(mkt_data.price_change_percentage_24h);
        price_change_percentage_7d.push(mkt_data.price_change_percentage_7d);
        price_change_percentage_30d.push(mkt_data.price_change_percentage_30d);
        price_change_percentage_1y.push(mkt_data.price_change_percentage_1y);

      }
    });
}   


dropdown.addEventListener('change', () => {
  selected_currency = dropdown.value;
  pop_dashboard(selected_currency);
}
  
)

console.log(logos);

