import { clearPage, renderPageTitle } from '../../utils/render';

const companyPage = async () => {
  clearPage();
  renderPageTitle('Company Page');

  const companyDescription = await getDescriptionFromAPI(1);

  const allJobOfferOfCompany = await getAllJobOfferOfCompanyFromAPI(1);

  renderCompanyPage(companyDescription, allJobOfferOfCompany);
};
async function getDescriptionFromAPI(idCompany) {
  try {
    const response = await fetch(`/api/compagnies/${idCompany}`);

    if (!response.ok) throw new Error('fetch error : ', response.status, response.statusText);

    const description = await response.json();
    // eslint-disable-next-line no-console
    console.log(description);
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
    console.log(allJobOffer);
    return allJobOffer;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CompanyPageDev all jobOffer error: ', error);
    throw error;
  }
}

function renderCompanyPage(description, allJobOfferOfCompany) {
  const main = document.querySelector('main');
  const descriptionString = renderDescriptionAsString(description);
  main.innerHTML += descriptionString;
  const allJobOfferString = renderAllJobOfferOfCompany(allJobOfferOfCompany);
  main.innerHTML += allJobOfferString;
}

function renderAllJobOfferOfCompany(jobOffers) {
  let allOffer = `<div class="container my-1"><h1>Ses dernières offres d emploi:</h1>`;
  jobOffers?.forEach((offer) => {
    const date = new Date(offer.upload_date);

    allOffer += `<div class="container my-1"> 
        <h3>Type d'offre : ${offer.type_offer}</h3>
        <h2>${offer.title}</h2>
      <h4>Description : ${offer.description}</h4>

      <p>Publié le ${date.toLocaleDateString()}</p>
        </div>`;
  });
  allOffer += `</div>`
  return allOffer;
}

function renderDescriptionAsString(description) {
  const descriptionString = `
    <div class = "container descCompany"> 
    <h1> ${description.company_name}</h1>
    <h3> ${description.description}</h3>
    <h4> ${description.adress}</h4>
    <h4> ${description.mail}</h4> </div>
    `;

  return descriptionString;
}

export default companyPage;
