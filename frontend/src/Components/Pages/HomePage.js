import { clearPage } from "../../utils/render";

const renderHomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `<div class="container">
                      <div class="text-center">
                        <button type="button" class="btn btn-primary btn-lgg">S'inscrire</button>
                      </div>
                    </div>`;
};


const Homepage = () => {
  clearPage();
  renderHomePage();
};

export default Homepage;
