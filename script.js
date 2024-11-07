const apiUrl = 'https://corsproxy.io/?' + encodeURIComponent("https://jacintodesign.github.io/quotes-api/data/quotes.json");
const stoicQuoteUrl = 'https://corsproxy.io/?' + encodeURIComponent("https://stoic.tekloon.net/stoic-quote");
const zenQuotesURL = 'https://corsproxy.io/?' + encodeURIComponent("https://zenquotes.io/api/random");
let apiQuotes = [];
const quoteBtn = document.getElementById("quote-btn");
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");


function newZenQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
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
}


function newStoicQuote() {
  
}


async function getZenQuotes(){
    try {
        const response = await fetch(zenQuotesURL);
        apiQuotes = await response.json();
        newZenQuote();
       
    } catch {
        //alert("Error is fetching quotes");
    }
}

async function getStoicQuotes() {
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

  } catch {
    //alert("Error is fetching quotes");
  }
}


//quoteBtn.addEventListener("click", getZenQuotes);

quoteBtn.addEventListener("click", getStoicQuotes);