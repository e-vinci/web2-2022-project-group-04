import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');

function renderRegisterFormDevPageAsString() {
  return `<div class="container-fluid 
   row justify-content-evenly">
  <div class="col-6 text-center bg-secondary text-white " id="clickForFormDev">
 Développeur
</div>
<div class="col-6 text-center bg-light" id="clickForFormCompanie">
Entreprise
</div>
  </div>

  <form id="registerFormDevelopper" class="white p-3 container">

  <div class="form-group">
    <label for="Nom">Nom</label>
    <input
      type="text"
      class="form-control"
      id="idNom"
      aria-describedby="lastNameHelp"
      placeholder="Entrez votre nom"
    />
  </div>

  <div class="form-group">
    <label for="Prenom">Prénom</label>
    <input
      type="text"
      class="form-control"
      id="idPrenom"
      aria-describedby="firstNameHelp"
      placeholder="Entrez votre prénom"
    />
  </div>

  <div class="form-group">
    <label for="email">E-mail</label>
    <input
      type="email"
      class="form-control"
      id="idEmail"
      placeholder="ex: johndoe@outlook.com"
    />
   
  </div>

  <div class="form-group">
    <label for="tel">numéro de téléphone</label>
    <input
      type="tel"
      class="form-control"
      id="idPhoneNumber"
      placeholder="ex: 0412 34 56 90"
    />
   
  </div>

  <div class="form-group">
    <label for="Password">Mot de passe</label>
    <input
      type="password"
      class="form-control"
      id="idPassword"
      placeholder="(min. 8 caractères, 1 majuscule et 1 chiffre)"
    />
  </div>

  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1"
      >en soumettant ce formulaire, j'accepte que DevJob utilise mes données dans le strict cadre de nos service tout en respectant le <a
      href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32016R0679&from=FR"
      >RGPD</a.</label
    >
  </div>
  <button type="submit" class="btn btn-primary">S'enregistrer</button>
</form>`;
}
const renderRegisterFormDevPage = () => {
  clearPage()
  main.innerHTML += renderRegisterFormDevPageAsString();
  attachListeners();
};
function renderRegisterFormCompaniesPageAsString() {
  return `<div class="container-fluid 
   row justify-content-evenly">
  <div class="col-6 text-center bg-light   " id="clickForFormDev">
 Développeur
</div>
<div class="col-6 text-center bg-secondary text-white" id="clickForFormCompanie">
Entreprise
</div>
  </div>
  <form id="registerFormDevelopper" class="white p-3 container">
  <div class="form-group">
    <label for="Nom">Nom Entreprise</label>
    <input
      type="text"
      class="form-control"
      id="idNom"
      aria-describedby="lastNameHelp"
      placeholder="Entrez votre nom d'entreprise"
    />
  </div>

  <div class="form-group">
  <label for="email">E-mail</label>
  <input
    type="email"
    class="form-control"
    id="idEmail"
    placeholder="ex: johndoe@outlook.com"
  />

  <div class="form-group">
  <label for="adress">adresse</label>
  <textarea
    type="text"
    class="form-control"
    id="idAdress"
    aria-describedby="adressHelp"
    placeholder="Entrez l'adresse d'entreprise"
  ></textarea>
</div>

<div class="form-group">
  <label for="adress">description</label>
  <textarea
    type="text"
    class="form-control"
    id="idDescription"
    aria-describedby="adressHelp"
    placeholder="Entrez une breve description de votre entreprise"
  ></textarea>
</div>


    
  </div>

  <div class="form-group">
    <label for="Password">Mot de passe</label>
    <input
      type="password"
      class="form-control"
      id="idPassword"
      placeholder="(min. 8 caractères, 1 majuscule et 1 chiffre)"
    />
  </div>

  <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
    <label class="form-check-label" for="exampleCheck1"
      >en soumettant ce formulaire, j'accepte que DevJob utilise mes données dans le strict cadre de nos service tout en respectant le <a
      href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32016R0679&from=FR"
      >RGPD</a.</label
    >
  </div>
  <button type="submit" class="btn btn-primary">S'enregistrer</button>
</form>`;
}
const renderRegisterFormCompaniesPage = () => {
  clearPage();

  main.innerHTML += renderRegisterFormCompaniesPageAsString();
  attachListeners();
};

const RegisterFormPage = () => {
  renderRegisterFormCompaniesPage();
};
function attachListeners() {
  const buttonDisplayFormDev = document.querySelector('#clickForFormDev');
  const buttonDisplayFormCompanie = document.querySelector('#clickForFormCompanie');
  buttonDisplayFormDev.addEventListener('click', () => {
    renderRegisterFormDevPage();
  });
  buttonDisplayFormCompanie.addEventListener('click', () => {
    renderRegisterFormCompaniesPage();
  });
}

export default RegisterFormPage;
