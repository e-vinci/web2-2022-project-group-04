import { clearPage,renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';

const companyPage = async () => {
  clearPage();
renderPageTitle('Votre Profil')
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

async function renderCompanyPage(description, allJobOfferOfCompany) {
  const main = document.querySelector('main');
  main.style = ' ';
  const descriptionString = renderDescriptionAsString(description);
  main.innerHTML += descriptionString;
  const allJobOfferString = await renderAllJobOfferOfCompany(allJobOfferOfCompany);
  main.innerHTML += allJobOfferString;
}

async function renderAllJobOfferOfCompany(jobOffers) {
  let allOffer = `<div class="container my-1"><h1>Vos dernières offres d'emplois:</h1>`;

  // eslint-disable-next-line no-restricted-syntax
  for (const offer of jobOffers) {
    let matchesDev;
    // eslint-disable-next-line no-await-in-loop
    const response = await fetch( `/api/jobOffers/getMatchesDevAndCompnay/${offer.id_offer}` );
    console.log(offer.id_offer)
    if(!response.ok){
       matchesDev = undefined;
    }
    else{
    // eslint-disable-next-line no-await-in-loop
      matchesDev = await response.json();  
      console.log(matchesDev)
    }
        const date = new Date(offer.upload_date);

    allOffer += `<div class="container my-4 descCompany"> 
    
    <h2>Titre : ${offer.title}</h2>
        <h5>Type d'offre : ${offer.type_offer}</h5>
        
      <h4>Description : ${offer.description}</h4>

      <p>Publié le ${date.toLocaleDateString()}</p>
        `;

        if(matchesDev===undefined){
          allOffer+= `    <h2> Aucun matches pour l'instant</h2>
          `
        }
        else{
          allOffer+=`<h2> Les devlopeurs qui vous intéressent : </h2>`
          // eslint-disable-next-line no-restricted-syntax
          for (const dev of matchesDev) {

            allOffer+= `
            <h6 id ="h2HP"> Profil concis </h6>
            <ul class="list-group list-group-flush rounded-4"> 
              <li class="list-group-item list-group-item-dark"> Nom : ${dev.lastname} </li>
              <li class="list-group-item list-group-item-dark"> Prénom : ${dev.firstname} </li>
              <li class="list-group-item list-group-item-dark"> Email : ${dev.mail} </li>
            </ul>
            `
        }
  }
  allOffer+=`</div>`

  }
  allOffer += `</div>`


  return allOffer;
}

function renderDescriptionAsString(description) {
  const descriptionString = `
    <div class = "container descCompany"> 
    <h1>Votre nom : ${description.company_name}</h1>
    <h4>Description : ${description.description}</h4>
    <h4>Adresse :${description.adress}</h4>
    <h4>Mail :  ${description.mail}</h4> </div>
    `;

  return descriptionString;
}


export default companyPage;
