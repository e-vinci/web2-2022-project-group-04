import { clearPage, renderPageTitle } from '../../utils/render';

const companyPage = async () => {
    clearPage();
    renderPageTitle('Company Page');
    // we must take the company identifier from the local storage
    const companyDescription = await getDescriptionFromAPI(1);

    renderCompanyPage(companyDescription);

};
async function getDescriptionFromAPI (idCompany){

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

function renderCompanyPage(description){
    const main = document.querySelector('main');
    const pageCompany = renderDescriptionAsString(description);
    main.innerHTML += pageCompany;
    
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
