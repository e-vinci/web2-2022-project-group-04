import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage, renderPageTitle } from '../../utils/render';
import { setAuthenticatedUser } from'../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';


const main = document.querySelector('main');


const renderRegisterFormDevPage = () => {

  main.innerHTML = `<form id ="registerFormDevelopper">
                            <div class="form-group">
                                <label for="Nom">Nom</label>
                                <input type="text" class="form-control" id="idLastname" aria-describedby="lastNameHelp" placeholder="Entrez votre nom">
                            </div>

                            <div class="form-group">
                                <label for="Prenom">Prénom</label>
                                <input type="text" class="form-control" id="idFirstname" aria-describedby="firstNameHelp" placeholder="Entrez votre prénom">
                            </div>

                            <div class="form-group">
                                <label for="Email">E-mail</label>
                                <input type="email" class="form-control" id="mail" placeholder="ex: johndoe@outlook.com">
                            </div>

                            <div class="form-group">
                                <label for="MotDePasse">Mot de passe</label>
                                <input type="password" class="form-control" id="password" placeholder="(min. 8 caractères, 1 majuscule et 1 chiffre)">
                            </div>

                            <div class="form-group">
                                <label for="DateDeNaissance">Date de naissance</label>
                                <input type="date" class="form-control" id="idDate" placeholder="">
                            </div>

                            <div class="form-group">
                                <label for="Telephone">Téléphone</label>
                                <input type="tel" class="form-control" id="idPhone" placeholder="">
                            </div>

                            <div class="form-group">
                                <label for="TypeDOffre">Type d'offre</label>
                                <input list="TypeOffre" id="idOffer">
                                    <datalist id="TypeOffre">
                                        <option value="CDI">
                                        <option value="CDD">
                                        <option value="Stage">
                                        <option value="Formation">
                                        <option value="Etudiant">
                                    </datalist>
                            </div>

                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                <label class="form-check-label" for="exampleCheck1">Se souvenir de moi</label>
                            </div>
                            <button id="register" type="submit" class="btn btn-primary">S'enregistrer</button>
                            </form>`;



const form = document.getElementById('registerFormDevelopper');
form.style = 'background-color : azure;';
form.addEventListener('submit', onRegister);
async function onRegister(e) {
    e.preventDefault();
const lastname =document.getElementById('idLastname').value;
const firstname =document.getElementById('idFirstname').value;
const mail = document.getElementById('mail').value;
const password = document.getElementById('password').value;
const birthDate =document.getElementById('idDate').value;
const tel =document.getElementById('idPhone').value;
const typeOfferRequired =document.getElementById('idOffer').value;

const options = {
  method: 'POST',
  body: JSON.stringify({
    lastname,
    firstname,
    mail,
    password,
    birth_date : birthDate,
    tel,
    type_offer_required : typeOfferRequired
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
};



const RegisterFormDevPage = () => {
  clearPage();
  renderPageTitle('Register');
  renderRegisterFormDevPage();
};








export default RegisterFormDevPage;


