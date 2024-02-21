'use strict'

var url='https://aowheel.github.io/shinsuke/data.json';
var btn=document.querySelector('#btn');
btn.addEventListener('click', () => {
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        alert(json);
    });
}, false);