import { clearPage, renderPageTitle } from '../../utils/render';

const HomePageDev = async () => {
  try {
    clearPage();
    renderPageTitle('Home Page Dev');

    const AllOffers = await getAllOffersFromAPI();

    renderAllOffers(AllOffers);
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error('HomePage::error: ', error);
    const errorText = document.querySelector('main');
    errorText.innerHTML = 'Erreur dans le chargement des offres D emploi ';
  }
};

function renderAllJobOffersAsString(jobOffers) {
  let allOffers = `
  <div class="container">`;

  jobOffers?.forEach((offer) => {
    const date = new Date(offer.upload_date);
    allOffers += ` 
      <h2>${offer.title}</h2>
      <h3>Nom de l'entreprise : ${offer.company_name}</h3>

      <h3>Type d'offre : ${offer.type_offer}</h3>
      
      <h4>Description : ${offer.description}</h4>

      <p>Publié le ${date.toLocaleDateString()}</p>
     
     
  <hr>  `;
  });

  allOffers += `</div>`;

  return allOffers;
}

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

export default HomePageDev;
