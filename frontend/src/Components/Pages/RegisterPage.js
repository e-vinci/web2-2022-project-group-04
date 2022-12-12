// eslint-disable-next-line spaced-comment
//Youssef
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage} from '../../utils/render';
import { setAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

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
     id="idLastname"
     aria-describedby="lastNameHelp"
     placeholder="Entrez votre nom"
   />
 </div>

 <div class="form-group">
   <label for="Prenom">Prénom</label>
   <input
     type="text"
     class="form-control"
     id="idFirstname"
     aria-describedby="firstNameHelp"
     placeholder="Entrez votre prénom"
   />
 </div>

 <div class="form-group">
   <label for="email">E-mail</label>
   <input
     type="email"
     class="form-control"
     id="mail"
     placeholder="ex: johndoe@outlook.com"
   />
  
 </div>
 <div class="form-group">
 <label for="DateDeNaissance">Date de naissance</label>
 <input type="date" class="form-control" id="idDate" placeholder="">
</div>
 <div class="form-group">
   <label for="tel">numéro de téléphone</label>
   <input
     type="tel"
     class="form-control"
     id="idPhone"
     placeholder="ex: 0412 34 56 90"
   />
  
 </div>
 <div class="form-group">
   <label for="Password">Mot de passe</label>
   <input
     type="password"
     class="form-control"
     id="password"
     placeholder="(min. 8 caractères, 1 majuscule et 1 chiffre)"
   />
 </div>
 <div class="form-group">
                                <label for="TypeDOffre">Type d'offre</label>
                                <select id="idOffer">
                                <option value="1">CDI</option>
                                <option value="2">CDD</option>
                                <option value="3">Stage</option>
                                <option value="4">Étudiant</option>
                                    
                                    </select>
                            </div>
<<<<<<< HEAD
                            <button id="register" type="submit" class="btn btn-primary">S'enregistrer</button>
                            </form>
                            </div></div>
                            `
                            ;
=======
 <div class="form-check">
   <input type="checkbox" class="form-check-input" id="exampleCheck1" />
   <label class="form-check-label" for="exampleCheck1"
     >en soumettant ce formulaire, j'accepte que DevJob utilise mes données dans le strict cadre de nos service tout en respectant le <a
     href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32016R0679&from=FR"
     >RGPD</a.</label
   >
 </div>
 <button type="submit" class="btn btn-primary" id="register">S'enregistrer</button>
</form>`;

}
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
>>>>>>> e314bc54f8e94a34b9873dc37d9fcdca55c6b0d4


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
const renderRegisterFormDevPage = () => {
  clearPage();
  main.innerHTML += renderRegisterFormDevPageAsString();
  const form = document.getElementById('registerFormDevelopper');
  async function onRegisterDev(e) {
    e.preventDefault();
    const lastname = document.getElementById('idLastname').value;
    const firstname = document.getElementById('idFirstname').value;
    const mail = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
    const birthDate = document.getElementById('idDate').value;
    const tel = document.getElementById('idPhone').value;
    const typeOfferRequired = document.getElementById('idOffer').value;

    const options = {
      method: 'POST',
      body: JSON.stringify({
        lastname,
        firstname,
        mail,
        password,
        birth_date: birthDate,
        tel,
        type_offer_required: typeOfferRequired,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('/api/developers/registerDev', options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const authenticatedUser = await response.json();

    // eslint-disable-next-line no-console
    console.log('Newly registered & authenticated user : ', authenticatedUser);

    setAuthenticatedUser(authenticatedUser);

    Navbar();

    Navigate('/');
  }
  form.addEventListener('submit', onRegisterDev);

  attachListeners();
};

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
