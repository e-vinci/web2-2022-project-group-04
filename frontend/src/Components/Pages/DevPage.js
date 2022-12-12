import { clearPage, renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';
const developerPage = () => {
  clearPage();
  renderPageTitle('Dev Page');

  renderDevPage();
};

function renderDevPage() {
  
  const renderPage=renderDevPageAsString();
  const main = document.querySelector('main');
  main.innerHTML = renderPage;
}

async function getDescriptionDev() {
  try {
    const response = await fetch(`/api/developers/profileDev/${idDevlopper}`);

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
async function getmasteredLanguageByIdDev(idDevlopper) {
  try {
    const response = await fetch(`/api/developers/masteredLanguageDev/${idDevlopper}`);

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

function renderDevPageAsString() {
  const descriptionDev = renderGenerealsInfosDev(getDescriptionDev());
  const masteredLanguagesDev = renderMasteredlanguageDev(listMasteredlanguage(getmasteredLanguageByIdDev()));

  const renderPage=descriptionDev + masteredLanguagesDev;
  return renderPage;
}


function renderGenerealsInfosDev(description) {

  const descriptionString = `
  
  <div class="container mx-auto my-4 bg-white">
  <div class="row justify-content-center my-4">
    <div class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-secondary">  
          <h3> Profil</h3> 
    </div>
  </div>
  <div class="row">
    <div class="col-lg-3 rounded-4 bg-light mx-2">
      <div class="d-flex justify-content-center my-5 py-2 bg-">
        <img src="frontend/src/img/Carré_rouge.png alt="" class="img-thumbnail">
      </div>
    </div>
    <div class="col rounded-4 bg-light mx-2">
      <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3  bg-secondary">  
          <h3>Informations generales</h3> 
      </div>
      <ul> 
          <li> ${description.lastName}   </li>
          <li> ${description.frrstName}  </li>
          <li> ${description.birth_date} </li>
          <li>${description.tel}</li>
        </ul>
    `
    ;
  return descriptionString;
}

function renderMasteredlanguageDev(listMasteredlanguages) {
  const descriptionString = `
  
  <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3   bg-secondary">
            <h3>Compétences </h3>
        </div>
        <ul>
       ${listMasteredlanguages.language}  
       </ul>
      </div>
    </div>
  </div>`;
          
  return descriptionString;
}


function listMasteredlanguage(listLanguage){

  let listMasteredlanguag = '';

  listLanguage?.forEach((language) => {
    listMasteredlanguag += `
      <li>${language.title}</li>`;
  });

  return listMasteredlanguag;

}


export default developerPage;
