import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';

const main = document.querySelector('main');
main.style = 'background-color : azure;';

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
                                <input type="email" class="form-control" id="idEmail" placeholder="ex: johndoe@outlook.com">
                            </div>

                            <div class="form-group">
                                <label for="MotDePasse">Mot de passe</label>
                                <input type="password" class="form-control" id="idPassword" placeholder="(min. 8 caractères, 1 majuscule et 1 chiffre)">
                            </div>

                            <div class="form-group">
                                <label for="DateDeNaissance">Date de naissance</label>
                                <input type="date" class="form-control" id="idDate" placeholder="">
                            </div>

                            <div class="form-group">
                                <label for="Telephone">Téléphone</label>
                                <input type="tel" class="form-control" id="idTelephone" placeholder="">
                            </div>

                            <div class="form-group">
                                <label for="TypeDOffre">Type d'offre</label>
                                <input list="TypeOffre">
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
};
const RegisterFormDevPage = () => {
  clearPage();
  renderRegisterFormDevPage();
};

export default RegisterFormDevPage;
