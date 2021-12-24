import './css/styles.css';
import countryCardTpl from './templates/country-card.hbs';
import countryCardTp2 from './templates/countr-car-al.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from "lodash";
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

// =============================
const refs = {
   cardContainer: document.querySelector(".country-info"),
   searchBox: document.querySelector('#search-box'),
   listCountry: document.querySelector(".country-list"),
};

// ==свойство=debounce================== 
refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
   e.preventDefault();
   // let namberInput = refs.searchBox.value.length;
   let wordInput = refs.searchBox.value;
   // ==свойство=trim()================== 
   let searchQuery = wordInput.trim()
   // console.log('namberInput-', namberInput)
   // console.log('wordInput.trim-', wordInput.trim())
   // console.log('searchQuery-', searchQuery)
   if (searchQuery.length >= 1) {
      // Notify.info('Too many matches found. Please enter a more specific name.');
      API.fetchCountries(searchQuery)
         .then(rendercardContainer)
         .catch(error => {
            console.log(error)
         });
   } else (
      rendercardContainer([])
   )

   //  else {
   //    API.fetchCountries(searchQuery)
   //       .then(rendercardContainer)
   //       .catch(error => {
   //          console.log(error)
   //       });
   // };
};

// =====render============
function rendercardContainer(country) {
   let resp = country;
   // console.log(resp.length)
   if (resp.length === 1) {
      let markup = countryCardTpl(country);
      refs.cardContainer.innerHTML = markup;
      // console.log(markup)
   } else if (resp.length > 1 && resp.length <= 10) {
      let markup2 = countryCardTp2(country);
      refs.cardContainer.innerHTML = markup2;
      // console.log(markup2)
   } else if (resp.length === undefined || resp.length === 0) {
      let markup2 = countryCardTp2(country);
      refs.cardContainer.innerHTML = markup2;
   } else if (resp.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
   }
};
