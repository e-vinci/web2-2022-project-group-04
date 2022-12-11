import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const renderHomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="homePageDiv">
                      <div id="containerHomePage" class="container">
                        <div class="text-center">
                          <h1 class="sloganText1">Facilitez vous la vie,<br> 
                          trouvez un job avec DevJob
                          </h1>
                          <h3 class="sloganText2">
                          </h3>
                          <button id="btn-register" data-uri="/register type="button" class="btn btn-primary btn-lgg">S'inscrire</button>
                        </div>
                      </div>
                    </div>`;const registerButton = document.getElementById('btn-register');
registerButton.addEventListener('click', (e) => {
  e.preventDefault();
  Navigate('/register');
});
};



const Homepage = () => {
  clearPage();
  renderHomePage();
};

export default Homepage;
