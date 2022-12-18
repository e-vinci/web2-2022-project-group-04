import Swiper, { Navigation, Keyboard, EffectCube } from 'swiper';
import { clearPage, renderPageTitle } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuthenticatedUser } from '../../utils/auths';
// core version + navigation, pagination modules:

let click;

// configure Swiper to use modules
Swiper.use([Navigation, Keyboard, EffectCube]);
// d'abbord afficher les offres avant d'executer le script

const SwipePage = async () => {
  
  const AllOffers = await getAllOffersFromAPI();
  await renderSwipePage(AllOffers);

  // renderAllOffers(AllOffers);
  const allLikeButton = document.querySelectorAll('.iLike');

  document.onclick = (b) => {
    click = b.target;
  };
  
  allLikeButton.forEach(form => { 
  form.addEventListener('submit',onLikedOffer);
});

};



async function renderSwipePage(AllOffers) {
  try {
    
    const head = document.querySelector('head');
    const foot = document.querySelector('footer');
    head.innerHTML += `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>`;
    foot.innerHTML += `<script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script>`;
    foot.innerHTML += ``;
    const main = document.querySelector('main');
    const allJobOfferFromCompany = await renderAllJobOffersAsString(AllOffers);

   
    console.log(
      'TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT',
      allJobOfferFromCompany,
    );
    clearPage();
  renderPageTitle('Offres');
    main.innerHTML += `<!-- Slider main container -->
  <div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    ${allJobOfferFromCompany}
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  
  </div>`;

    const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true,
      effect: 'cube',
      grabCursor: true,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 50,
        shadowScale: 0.3,
      },
      // If we need pagination
      keyboard: {
        enabled: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      
    });
    swiper.scrollbar.destroy();

    swiper();
  } catch (error) {
    console.log(error);
  }
}

async function renderAllJobOffersAsString(jobOffers) {
  let allOffers = ``;
  // eslint-disable-next-line no-restricted-syntax
  for (const offer of jobOffers) {
    const date = new Date(offer.upload_date);
    // eslint-disable-next-line no-await-in-loop
    const language = await getAllLanguageFromOfferAPI(offer.id_offer);
    const languageString = getLanguageAsString(language);
    //  console.log('LANGUAGE STRING', languageString);
    allOffers += ` <div class="swiper-slide ">
    <table class="table table-info">
    <thead>
      <th scope="row">${offer.title} chez ${offer.company_name} <br> 
      Publié le ${date.toLocaleDateString()}</th>
      <th scope="row"></th>
      <th scope="row"></th>
      
      
    </thead>
      
      <th scope="row">${offer.type_offer} </th>
      <th scope="row">${offer.description}</th>
      <th scope="row">${languageString} </th> 
      
    
      </table>

      <form class="iLike">
      <input type="submit" class="btn btn-success" value="j'aime">
      <input type="hidden" value = "${offer.id_offer}" class="id_offer">
      </form>
      </div>
     `;
  }

  console.log(allOffers);
  return allOffers;
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

async function getAllLanguageFromOfferAPI(idOffer) {
  try {
    const response = await fetch(`/api/jobOffers/getLanguageRequired/${idOffer}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const languages = await response.json();
    // console.log(languages);
    return languages;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePageDev  error: ', error);
    throw error;
  }
}

function getLanguageAsString(listLanguage) {
  let languageRequired = ``;
  listLanguage?.forEach((l) => {
    languageRequired += `<p>${l.language}</p>`;
  });

  return languageRequired;
}

async function onLikedOffer(e) {
  e.preventDefault();

  console.log(click);
  const tab = click.parentElement.elements;
  const offer = tab[1].value;
  const developer = getAuthenticatedUser().id;
  console.log(offer);
  console.log(developer);

  const options = {
    method: 'POST',
    body: JSON.stringify({
      idOffer : offer,
      idDeveloper : developer,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('/api/jobOffers/addToInterstedDev', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  // eslint-disable-next-line no-console
  console.log('Newly match with the developer : ', developer);
}

export default SwipePage;
