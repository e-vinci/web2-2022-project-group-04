import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');
const renderRegisterFormDevPage = () => {
        main.innerHTML = `<div class="contener-fluid 
        bg-warning row justify-content-evenly">
        <div class="col-6 text-center bg-secondary text-white">
       Développeur
      </div>
      <div class="col-6 text-center bg-light">
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
          <small id="emailHelp" class="form-text text-muted"
            >Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.</small
          >
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
            >en soumettant ce formulaire, j'accepte que DevJob utilise mes coordonnées dans le strict cadre de nos service tout en respectant le <a
            href="https://eur-lex.europa.eu/legal-content/FR/TXT/HTML/?uri=CELEX:32016R0679&from=FR"
            >RGPD</a.</label
          >
        </div>
        <button type="submit" class="btn btn-primary">S'enregistrer</button>
      </form>`;
};
const RegisterFormDevPage = () => {
  clearPage();
  renderRegisterFormDevPage();
};

export default RegisterFormDevPage;
