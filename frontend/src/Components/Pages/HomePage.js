import { clearPage } from "../../utils/render";
import Navigate from "../Router/Navigate";

const renderHomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="container">
                      <div class="text-center">
                        <button id="btn-register" type="button" class="btn btn-primary btn-lgg">S'inscrire</button>
                      </div>
                    </div>`;
};


const registerButton = document.getElementById('btn-register');
registerButton.addEventListener(onclick, (e) => {
  e.preventDefault();
  const uri = e.target?.dataset?.uri;
  Navigate(uri);
}
);



const Homepage = () => {
  clearPage();
  renderHomePage();
};

export default Homepage;
