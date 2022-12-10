import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const main = document.querySelector('main');

const renderOfferFormPage = () => {
  main.innerHTML = `<form id ="offerForm">
                            <div><h2>Poster une nouvelle offre</h2><div>

                            <div class="form-group">
                                <label for="Titre">Titre de l'offre</label>
                                <input type="text" class="form-control" id="idTitle" aria-describedby="titleHelp" placeholder="Entrez le titre de l'offre">
                            </div>

                            <div class="form-group">
                                <label for="Description">Description de l'offre</label>
                                <input type="text" class="form-control" id="idDescription" aria-describedby="offerTypeHelp" placeholder="Description">
                            </div>

                            <div class="offerList">
                                <label for="TypeDOffre">Type d'offre</label>
                                <input list="TypeOffre" id="idOfferType">
                                    <datalist id="TypeOffre">
                                    {{#each type_offers}}
                                        <option value="{{this.id_type_offer}}">
                                        <option value="{{this.id_type_offer}}">
                                        <option value="{{this.id_type_offer}}">
                                        <option value="{{this.id_type_offer}}">
                                        {{/each}}
                                    </datalist>
                            </div>

                            <button id="createOffer" type="submit" class="btn btn-primary">Poster l'offre</button>
                            </form>`;



  const form = document.getElementById('offerForm');
  form.style = 'background-color : azure;';
  form.addEventListener('submit', onCreateForm);
  async function onCreateForm(e) {
    e.preventDefault();
    const company = 1;
    const typeOffer = document.getElementById('idOfferType').value;
    const title = document.getElementById('idTitle').value;
    const description = document.getElementById('idDescription').value;
    
    const options = {
      method: 'POST',
      body: JSON.stringify({
        idCompany: company,
        typeOffer,
        title,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/jobOffers/create', options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
   
    const validOffer = await response.json();

    // eslint-disable-next-line no-console
    console.log('Newly registered offer : ', validOffer);

    Navigate('/');
  }
};

const CreateOfferFormPage = () => {
  clearPage();
  renderPageTitle('CreateOfferForm');
  renderOfferFormPage();
};

export default CreateOfferFormPage;
