const stoicQuoteUrl = 'https://corsproxy.io/?' + encodeURIComponent("https://stoic.tekloon.net/stoic-quote");
const zenQuotesURL = 'https://corsproxy.io/?' + encodeURIComponent("https://zenquotes.io/api/random");
let apiResponseQuotes = [];
const quoteBtn = document.getElementById("quote-btn");
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

//Display loading spinner
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function hideLoading(){
     quoteContainer.hidden = false;
     loader.hidden = true;
}

//Get a stoic quote
async function getStoicQuotes() {
    loading();
  try {
    const response = await fetch(stoicQuoteUrl);
    const json = await response.json();
    const author = json.data.author;
    const quote = json.data.quote;
    console.log("Author = " + author);
    console.log("Quote = " + quote);

    if (!author) {
      authorText.textContent = "Unknown";
    }

    authorText.textContent = author;

    if (quote.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote;
    hideLoading();

  } catch {
    alert("Error is fetching quotes");
  }
}


//Selects a random Zen quote form the json response array of quotes
/*function selectZenQuote(){
    loading();
    const quote =
      apiResponseQuotes[Math.floor(Math.random() * apiResponseQuotes.length)];
    if(!quote.author){
        authorText.textContent = "Unknown";
    }

    authorText.textContent = quote.a;

    if(quote.q.length > 50){
          quoteText.classList.add("long-quote");  
    }else{
        quoteText.classList.remove("long-quote");  
    }
    
    quoteText.textContent = quote.q;
    hideLoading();
}

//Get a Zen quote and assign response to an array
async function getZenQuotes(){
    loading();
    try {
        const response = await fetch(zenQuotesURL);
        apiResponseQuotes = await response.json();
        selectZenQuote();
       
    } catch {
        alert("Error is fetching quotes");
    }
}
*/


//Tweet Quote
function tweetQuote(){
    const xUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
    window.open(xUrl, '_blank');
}


//Hide loading spinner when first navigating to the page
hideLoading();

//Get quote button functionality
quoteBtn.addEventListener("click", getStoicQuotes);

//Tweet quote button functionality
twitterBtn.addEventListener("click", tweetQuote);
