//Choose a coin of interest for news
const coin_dropdown = document.querySelector('#coins');
const coin_list = ["Bitcoin", "Ethereum", "XRP", "Bitcoin Cash", "Bitcoin SV",
  "Litecoin", "EOS", "Tether", "Binance Coin", "Cardano", "Tezos", "TRON", "Stellar",
  "Monero", "Ethereum Classic", "Dash", "OKB", "ChainLink", "IOTA", "NEO", "LEO Token",
  "Huobi Token", "Cosmos", "Crypto.com Coin", "Zcash", "Ontology", "NEM", "Maker", "VeChain",
  "USD Coin", "Basic Attention Token", "Dogecoin", "Qtum", "Decred", "ICON", "Paxos Standard",
  "Bitcoin Gold", "Lisk", "Ravencoin", "Augur", "0x", "Algorand", "Bytom", "OmiseGO", "TrueUSD",
  "Holo", "Nano", "MonaCoin", "Bitcoin Diamond", "Enjin Coin"];

const make_coin_dropdown = () => {
  for (let i = 0; i < coin_list.length; i++) {
     coin_dropdown.innerHTML += `<option id=${coin_list[i]}>${coin_list[i]}</option>`
   };
 }

make_coin_dropdown();

//define "today's date" for search
today = toString(new Date().toISOString().split('T')[0]);
 

//make news on change of dropdown
coin_dropdown.addEventListener('change', () => {
  selected_coin = coin_dropdown.value;
  pop_news(selected_coin);
}
)


//Get news API
source_2 = document.querySelector('#source_2');
my_key = 'f076eb0fae684880a870884a29b6a4ed';
newsAPI_URL = 'https://newsapi.org/v2/everything?';
my_language = 'en';


//Choose placement
const news = document.querySelector('.news');

const create_news = (parent, html_tag, className, value, img_src, article_link) => {
  let element = document.createElement(html_tag);
  element.setAttribute('class', className);
  element.innerHTML = value;
  element.setAttribute('src', img_src);
  element.setAttribute('href', article_link);
  parent.appendChild(element);
}



const pop_news = async (currency) => {
  let news_response = await axios.get(`https://newsapi.org/v2/everything?q=${selected_coin}&language=${my_language}&from=${today}&sortBy=publishedAt&apiKey=${my_key}`)
    .then(news_response => {
      
      //give credit to NewsAPI
      source_2.innerText = `Data from NewsAPI.org \ud83d\udcf0`;
      console.log(news_response.data.articles);

      //empty previous search
      news.innerHTML = '';

      for (i = 0; i < news_response.data.articles.length; i++){
       //make containers for every article
        let news_block = document.createElement('div');
        news_block.setAttribute('class', 'news_block');
        news.appendChild(news_block);

        let news_left = document.createElement('div');
        news_left.setAttribute('class', 'news_left');
        news_block.appendChild(news_left);

        let news_right = document.createElement('div');
        news_right.setAttribute('class', 'news_right');
        news_block.appendChild(news_right);

        //get data, create elements, and append them to the appropriate box
        let article_img = news_response.data.articles[i].urlToImage;
        create_news(news_left, 'img', 'news_image', '', article_img, '');

        let article_title = news_response.data.articles[i].title;
        create_news(news_right, 'h3', 'news_title', article_title, '', '');

        let link_text = 'View Article Here';
        let link = news_response.data.articles[i].url;
        create_news(news_right, 'a', 'news_link', link_text, '', link);
        
        let news_description = news_response.data.articles[i].description;
        create_news(news_right, 'h3', 'news_description', news_description, '', '');

      }
    
     }
    )
}



