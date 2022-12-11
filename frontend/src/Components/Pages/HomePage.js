import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import 'bootstrap/dist/css/bootstrap.min.css';


const renderHomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="homePageDiv">
                      <div class="container">
                        <div class="text-center">
                           <h1 class="block-title">Facilitez vous la vie,<br> 
    trouvez un job avec DevJob</h1>
                          <h3 class="sloganText2">
                          </h3>
                          
                        </div>
                      </div>
                      <div class="container">
                      <div class="block block-inverse text-center">
  <div class="block-foreground">
   
    <h4 class="text-muted">Par des developpeurs, pour des developpeurs.</h4>
    <button class="btn btn-outline-secondary mt-1" class="text-center" id="btn-register" data-uri="/register type="button">S'inscrire maintenant</button>
  </div>
 
</div>
                    
                    </div>
                    </div>
                    <div class="container">
                    <div class="d-flex justify-content-around">
                      <img src="" alt="" width="400" height="200" id="team" class="rounded">
                    </div>
                    <div class="text-center">
                    <h5 class="text-muted"> Abid Ibrahim - Abouhamid Youssef - Choujaa Soulaimane <br> 
                     El Bouhtani Oussama - Fiore Matteo </h4>
                    </div>
                    </div>
                    
                    `;
                    
  const registerButton = document.getElementById('btn-register');
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
