import { clearPage, renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';

const companyPage = async () => {
  clearPage();
  renderPageTitle('Company Page');

  const idCompany = getAuthenticatedUser().id;
  console.log(idCompany)
  const companyDescription = await getDescriptionFromAPI(idCompany);
  const allJobOfferOfCompany = await getAllJobOfferOfCompanyFromAPI(idCompany);

  renderCompanyPage(companyDescription, allJobOfferOfCompany);
};

async function getDescriptionFromAPI(idCompany) {
  try {
    const response = await fetch(`/api/compagnies/${idCompany}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const description = await response.json();
    // eslint-disable-next-line no-console
    return description;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CompanyPageDev  error: ', error);
    throw error;
  }
}

async function getAllJobOfferOfCompanyFromAPI(idCompany) {
  // /jobOffers/allJobOfferFromCompany/

  try {
    const response = await fetch(`api/jobOffers/allJobOfferFromCompany/${idCompany}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const allJobOffer = await response.json();
    // eslint-disable-next-line no-console
    return allJobOffer;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CompanyPageDev all jobOffer error: ', error);
    throw error;
  }
}

/* async function getMatchesOfCompanyFromAPI(idCompany){

} */

function renderCompanyPage(description, allJobOfferOfCompany) {
  const main = document.querySelector('main');
  main.style = ' ';
  const descriptionString = renderDescriptionAsString(description);
  main.innerHTML += descriptionString;
  const allJobOfferString = renderAllJobOfferOfCompany(allJobOfferOfCompany);
  main.innerHTML += allJobOfferString;
}

function renderAllJobOfferOfCompany(jobOffers) {
  let allOffer = `<div class="container my-1"><h1>Ses dernières offres d emploi:</h1>`;
  jobOffers?.forEach((offer) => {
    const date = new Date(offer.upload_date);

    allOffer += `<div class="container my-4 descCompany"> 
    
    <h2>Titre : ${offer.title}</h2>
        <h5>Type d'offre : ${offer.type_offer}</h5>
        
      <h4>Description : ${offer.description}</h4>

      <p>Publié le ${date.toLocaleDateString()}</p>
        </div>
        `;
  });
  allOffer += `</div>`
  return allOffer;
}

function renderDescriptionAsString(description) {
  const descriptionString = `
    <div class = "container descCompany"> 
    <h1> ${description.company_name}</h1>
    <h4> ${description.description}</h4>
    <h4> ${description.adress}</h4>
    <h4> ${description.mail}</h4> </div>
    `;

  return descriptionString;
}


export default companyPage;
