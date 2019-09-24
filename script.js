'use strict';

function getRepos(user) {
  const url = `https://api.github.com/users/${user}/repos?type=all`;

  const options = {
    headers: new Headers({
      "token": "03bf9fa002441e83a70085e971f7459f89c366cc",
      "Origin": "github.com",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-GitHub-OTP, X-Requested-With",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE",
        "Access-Control-Expose-Headers": "ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval",
        "Access-Control-Max-Age": "86400"
    })
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => 
      displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong. Be sure that you are picking an existing user: ${err}`);
    });
}

 

function displayResults(responseJson) {
  let repos = responseJson.message;
  $('.results').removeClass('hidden');
  $('.repos-results').replaceWith(`<p class='.repos-results'>${repos}</p>`);
  console.log(responseJson);
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userList = $('.js-value-input').val().toLowerCase();
    getRepos(userList);
    console.log(userList);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});
