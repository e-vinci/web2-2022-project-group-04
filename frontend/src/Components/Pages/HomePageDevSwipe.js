import Swiper, { Navigation, Pagination } from 'swiper';
import { clearPage, renderPageTitle } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
// core version + navigation, pagination modules:


// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);


const SwipePage = async() => {
  clearPage();
  renderPageTitle('Offres');
  const AllOffers = await getAllOffersFromAPI();
  renderSwipePage(AllOffers);

  // renderAllOffers(AllOffers);

};

function renderSwipePage(AllOffers){
const head = document.querySelector('head');
const foot = document.querySelector('footer');
head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>`;
foot.innerHTML += `<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>`;
foot.innerHTML += ``;
const main = document.querySelector('main');
main.innerHTML += `<!-- Slider main container -->
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    ${renderAllJobOffersAsString(AllOffers)}
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>
`


// d'abbord afficher les offres avant d'executer le script
const swiper = new Swiper('.swiper', {
  // Optional parameters

  // If we need pagination
  pagination: {
  el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
  el: '.swiper-scrollbar',
  },
  
});

swiper();
}



function renderAllJobOffersAsString(jobOffers) {
  // eslint-disable-next-line no-unused-vars
  
  let swiperW= document.getElementsByClassName('swiper-wrapper');
  let allOffers = ``;

  jobOffers?.forEach((offer) => {
    const date = new Date(offer.upload_date);
    allOffers += ` <div class="swiper-slide ">
    <table class="table table-dark">
    <thead>
      <th scope="row">${offer.title} chez ${offer.company_name} <br> 
      Publié le ${date.toLocaleDateString()}</th>
      <th scope="row"></th>
      
    </thead>

      <th scope="row"> ${offer.type_offer} </th>
      <th scope="row">${offer.description}</th>
    
      </table>
      
      </div>
     `;
  });

  swiperW += allOffers;
  
  return swiperW;
}


// eslint-disable-next-line no-unused-vars
function renderAllOffers(jobOffers) {
  const tablesAllOffers = renderAllJobOffersAsString(jobOffers);
  const main = document.querySelector('main');
  main.innerHTML += tablesAllOffers;
}


async function getAllOffersFromAPI() {
  try {
    const response = await fetch('/api/jobOffers');

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const allOffers = await response.json();

    return allOffers;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePageDev  error: ', error);
    throw error;
  }
}



export default SwipePage;