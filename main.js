const dropdown = document.querySelector("#currencies");
let selected_currency;
const base_url = `https://api.coingecko.com/api/v3/coins`;
const dashboard = document.querySelector('#dashboard');
const source = document.querySelector('#source');
const crypto_gym = document.querySelector('#crypto_gym');


currency_list = [
  'Currencies', "usd", "eur", "rub", "jpy", "gbp" ,
  "aed", "ars", "aud", "bdt", "bhd", "bmd", "bnb", "brl", "btc", "cad", "chf", "clp", "cny",
  "czk", "dkk", "eos", "hkd", "huf", "idr", "ils", "inr", "krw", "kwd", "lkr", "ltc",
  "mmk", "mxn", "myr", "nok", "nzd", "php", "pkr", "pln", "rub", "sar", "sek", "sgd", "thb", "try", "twd", "uah",
  "vef", "vnd", "xag", "xau", "xdr", "xlm", "xrp", "zar"
];

const currency_dropdown = () => {
  for (let i = 0; i < currency_list.length; i++) {
    dropdown.innerHTML += `<option id=${currency_list[i].toUpperCase()}>${currency_list[i].toUpperCase()}</option>`
  };
}

currency_dropdown();


field_list = ['logos', 'names', 'current_prices', 'market_cap',
  'high_24h', 'low_24h', 'change_24h', 'change_7d', 'change_30d', 'change_1y']; 

field_titles = ['Logo', 'Coin', 'Price ($)', 'Market Cap ($B)', 'Last 24h High', 'Last 24h Low',
  '24h % \u0394', '7d % \u0394', '30d % \u0394', '1y % \u0394'];

const make_ul = (field_list) => {
  for (let i = 0; i < field_list.length; i++){
    let ul = document.createElement('ul');
    ul.setAttribute('id', field_list[i]);
    dashboard.appendChild(ul);
    console.log(ul);
  }
} 

make_ul(field_list);


const logos = document.querySelector('#logos');
const  names = document.querySelector('#names');
const current_prices = document.querySelector('#current_prices');
const market_cap = document.querySelector('#market_cap');
const high_24h = document.querySelector('#high_24h');
const low_24 = document.querySelector('#low_24h');
const change_24h = document.querySelector('#change_24h');
const change_7d = document.querySelector('#change_7d');
const change_30d = document.querySelector('#change_30d');
const change_1y = document.querySelector('#change_1y');

ul_elements = [logos, names, current_prices, market_cap, high_24h, low_24h, change_24h, change_7d, change_30d, change_1y];


const pop_column = (column, value) => {
  let new_element = document.createElement('li');
  new_element.innerHTML = `<a>${value}</a>`;
  column.appendChild(new_element);
}

const percentage = (number) => {
  number = `${number.toFixed()} %`;
  return number;
}


const empty_ul = (columns,titles) => {
  for (let i = 0; i < columns.length; i++){
    columns[i].innerHTML = '';

    let title = document.createElement('li');
    title.setAttribute('class', 'title');
    title.innerHTML = `<a>${field_titles[i]}</a>`;
    columns[i].appendChild(title);
    }
}

let n = 0;

//Fields populated for a given currency
const pop_dashboard = async (currency) => {

  let response = await axios.get(`${base_url}`)
    .then(response => {
    
      //give credit to CoinGecko
      source.innerText = `Data from CoinGecko \ud83e\udd8e`;
      
    //refresh the columns
      empty_ul(ul_elements, field_titles);
    
    //populate the columns
      for (let i = 0; i < response.data.length; i++) {
        //coin description
        let logo_value = response.data[i].image.thumb;
        let logo = document.createElement('li');
        logo.innerHTML = `<img src=${logo_value}>`;
        logos.appendChild(logo);

        let name_value = response.data[i].name;
        pop_column(names, name_value);

        //lower case currency because the dropdown is all caps
        let cur = currency.toLowerCase();
        let mkt_data = response.data[i].market_data;

        //current value
        let price = mkt_data.current_price[cur];
        let price_value = Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(price);
        pop_column(current_prices, price_value);
       

        let cap = (mkt_data.market_cap[cur])/1000000000;
        let market_cap_value = Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(cap);
        pop_column(market_cap, market_cap_value);
     
        //last 24hr price range
        let h24 = mkt_data.high_24h[cur];
        let h24_value = Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(h24);
        pop_column(high_24h, h24_value);

        let l24 = mkt_data.low_24h[cur];
        let l24_value = Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(l24);
        pop_column(low_24h, l24_value);
        

        //history of % change
        let change24h_value = percentage(mkt_data.price_change_percentage_24h);
        pop_column(change_24h, change24h_value);

        let change7d_value = percentage(mkt_data.price_change_percentage_7d);
        pop_column(change_7d, change7d_value);

        let change30d_value = percentage(mkt_data.price_change_percentage_30d);
        pop_column(change_30d, change30d_value);

        let change1y_value = percentage(mkt_data.price_change_percentage_1y);
        pop_column(change_1y, change1y_value);
      }
    });
}   

dropdown.addEventListener('change', () => {
  dashboard.style.border = '1px solid #cfcfc4';
  selected_currency = dropdown.value;
  pop_dashboard(selected_currency);
}
  
)
