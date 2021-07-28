"use strict";

import { api } from "./utils.js";

// http://thecrew.cc/news/read.php
// https://thecrew.cc/news/create.php

//  api url
const api_url = "http://thecrew.cc/news/read.php";
const post_url = "https://thecrew.cc/news/create.php";
const main = document.getElementById("container");

const renderArticles = async () => {
  main.innerHTML = "";
  //haalt articles op
  const articles = await api(api_url);
  //articles sorteren meeste naar minste sorteren
  const sortedArticles = articles.news.sort((a, b) => b.likes - a.likes);

  //krijgt array terug met allemaal dom elementen
  const rendered = sortedArticles.forEach(({ likes, title, content, UUID }) => {
    // $ voor dom elementen aan te spreken
    //zet ze in een nieuw element genaamd article
    const $article = document.createElement("article");
    $article.innerHTML = `
        <h1>likes: ${likes}</h1>
        <h3>${title}</h3>
        <div>${content}</div>
        <button data-like="${UUID}">Like article</button>
    `;
    main.append($article);
  });
};
//voert functie uit
renderArticles();
// logica schrijven om een article te liken
const likeArticle = async (UUID) => {
  const response = await api(post_url, "POST", { UUID });
  const data = await response;
  if (data === "created") renderArticles();
};

//event koppelen aan elk article button, checken of het wel dergelijk een button is, data set ophalen en mee geven in nieuwe functie
main.addEventListener("click", ({ target }) => {
  const isLikeBtn = target.closest("button[data-like]");
  // if de islikebtn is clicked haal de dataset van de like btn op
  if (isLikeBtn) likeArticle(isLikeBtn.dataset.like);
});
