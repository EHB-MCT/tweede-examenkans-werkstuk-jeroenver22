"use strict";

import { api } from "./utils.js";

let sortLike = {userInput: {selectedSort:'likes'}};
// http://thecrew.cc/news/read.php
// https://thecrew.cc/news/create.php

//  api url
const api_url = "http://thecrew.cc/news/read.php";
const post_url = "https://thecrew.cc/news/create.php";
const main = document.getElementById("container");
const $searchBar = document.getElementById("searchBar");
const $sortForm = document.getElementById('sortFn');

const sortDesc = (a, b) => b.likes - a.likes;
const sortAsc = (a, b) => a.likes - b.likes;

const sortArticles = (data, method='desc') => data.sort((a,b) => {
  if(method ==='desc') return sortDesc(a,b);
  if(method ==='asc') return sortAsc(a,b);

}); 

const renderArticles = async (query, sortMethod) => {
  main.innerHTML = "";
  //haalt articles op


  const articles = await api(api_url);
  console.log(articles);
  const searchByQuery = query ? articles.news.filter(({ title }) => title.toLowerCase().includes(query.toLowerCase())) : articles.news;  
  //articles sorteren meeste naar minste sorteren

  const sortedArticles = sortArticles(searchByQuery, sortMethod);





  //krijgt array terug met allemaal dom elementen
  const rendered = sortedArticles.forEach(
    ({ likes, title, content, UUID, imageURI, publicationDate }) => {
      // $ voor dom elementen aan te spreken
      //zet ze in een nieuw element genaamd article
      const $article = document.createElement("article");
      $article.innerHTML = `
        <h3>${title}</h3>
        <div class="information">${content}</div>
        ${imageURI != "" && `<img src="${imageURI}"/>`}
        <p>${publicationDate}</p>
        <div class="middle"><button class="text" data-like="${UUID}">&hearts;</button> <h1>likes: ${likes}</h1> </div>
    `;
      main.append($article);
    }
  );
};
//voert functie uit
renderArticles();
// logica schrijven om een article te liken
const likeArticle = async (UUID) => {
  const response = await api(post_url, "POST", { UUID });
  const data = await response;
  if (data === "created") renderArticles();
};
//on keyup search in the object
$searchBar.addEventListener("keyup", ({ target: { value } }) =>
  renderArticles(value)
);

//event koppelen aan elk article button, checken of het wel dergelijk een button is, data set ophalen en mee geven in nieuwe functie
main.addEventListener("click", ({ target }) => {
  const isLikeBtn = target.closest("button[data-like]");
  // if de islikebtn is clicked haal de dataset van de like btn op
  if (isLikeBtn) likeArticle(isLikeBtn.dataset.like);
});
$sortForm.addEventListener('change', ({target}) => {
  //data uit form halen
  const f = target.closest('form');


  const formData = new FormData(f);
  const value = formData.get('sortBy');
  renderArticles( null, value);
});



//sort function
/* const sortLikes = (likes) =>{
const sortRadios = document.getElementsByName('sortBy');
      sortRadios.forEach(function(like) {
        like.addEventListener('change', function(event) {
          sortLike.userInput.selectedSort = this.value;
          console.log(sortLike);
        });
      });
    };
  sortLikes(); */

  //