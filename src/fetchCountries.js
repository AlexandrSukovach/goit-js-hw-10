import { Notify } from 'notiflix/build/notiflix-notify-aio';
// ============запрос===============
function fetchCountries(name) {
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
      .then(response => {
         // ========mistake-404==========
         if (response.ok === false) {
            Notify.failure('Oops, there is no country with that name');
         }
         // console.log(response.json())
         return response.json();
      });
};

export default { fetchCountries };

