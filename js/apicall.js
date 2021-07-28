// jshint esversion: 8
"use strict";
const app = document.getElementById("container");
const api_url = "http://thecrew.cc/news/read.php";
// logo ehb inladen
const logo = document.createElement("img");
logo.classList.add("logo");
logo.src = "img/download.jfif";

app.appendChild(logo);

async function getNews(url) {
  // Storing data in form of JSON
  const resp = await fetch(url);
  console.log(resp);
  const data = await resp.json();

  console.log(data);
}
getNews(api_url);

// let request = new XMLHttpRequest();
// request.open("GET", "http://thecrew.cc/news/read.php", true);
// request.onload = function () {
// Begin accessing JSON data here
function showNews(data) {
  
  if (showNews.status >= 200 && showNews.status < 400) {
    data.forEach((news) => {
     
      console.log(data);
      console.log(showNews);
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = news.title;

      const p = document.createElement("p");
      news.content = news.content.substring(0, 300);
      p.textContent = `${news.content}...`;

      const imgURI = document.createElement("img");
      imgURI.innerHTML = `${news.imgURI}`;

      const likes = document.createElement("p");
      likes.textContent = `${news.likes}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement("marquee");
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}
