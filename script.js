//URL variables are prefixed with proxy server to avoid cors issues
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
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner(){
     quoteContainer.hidden = false;
     loader.hidden = true;
}

//Get a stoic quote
async function getStoicQuotes() {
    showLoadingSpinner();
  try {
    const response = await fetch(stoicQuoteUrl);
    const json = await response.json();
    const author = json.data.author;
    const quote = json.data.quote;
    console.log(`Author: ${author}`);
    console.log(`Quote: "${quote}"`);

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
    hideLoadingSpinner();

  } catch (error){
    console.log(error);
  }
}

/*
//Selects a random Zen quote form the json response array of quotes
function selectZenQuote(){
    showLoadingSpinner();
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
    console.log(`Quote: "${quote.q}"`);
    console.log(`Author: ${quote.a}`);
    hideLoadingSpinner();
}

//Get a Zen quote and assign response to an array
async function getZenQuotes(){
    showLoadingSpinner();
    try {
        const response = await fetch(zenQuotesURL);
        apiResponseQuotes = await response.json();
        selectZenQuote();
       
    } catch(error){
        console.log(error);
    }
}

*/

//Tweet Quote
function tweetQuote(){
    const xUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
    window.open(xUrl, '_blank');
}


//Hide loading spinner when first navigating to the page
hideLoadingSpinner();

//Get quote button functionality
quoteBtn.addEventListener("click", getStoicQuotes);
//quoteBtn.addEventListener("click", getZenQuotes);

//Tweet quote button functionality
twitterBtn.addEventListener("click", tweetQuote);
