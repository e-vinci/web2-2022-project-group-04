import { clearPage, renderPageTitle } from '../../utils/render';

const renderAllJobOffersAsString = (jobOffers) => {
  let allOffers = '';

  jobOffers?.forEach((offer) => {
    allOffers += `<table class="table table-sm my-5">
      <tbody>
      <tr>
        
        <td>${offer.company_name}</td>
        <td>${offer.type_offer}</td>
        <td>${offer.title}</td>
        <td>${offer.description}</td>
        <td>${offer.upload_date}</td>
      </tr>
        
    </tbody>
  </table>
          `;
  });
  
  return allOffers;
};

const renderAllOffers = (jobOffers) => {
  const tablesAllOffers = renderAllJobOffersAsString(jobOffers);
  const main = document.querySelector('main');
  main.innerHTML += tablesAllOffers;
};

async function getAllOffersFromAPI(){
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
};

const HomePageDev = async () => {
  try {
    clearPage();
    renderPageTitle('Home Page Dev');

    const AllOffers = await getAllOffersFromAPI()

    renderAllOffers(AllOffers);

    
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('HomePage::error: ', error);
  }
};

export default HomePageDev;
