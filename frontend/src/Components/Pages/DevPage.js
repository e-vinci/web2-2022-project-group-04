import { clearPage, renderPageTitle } from '../../utils/render';

const developerPage = () => {
  clearPage();
  renderPageTitle('Dev Page');

  renderDevPage();
};

function renderDevPage() {
  const page = renderDevPageAsString();
  const main = document.querySelector('main');
  main.innerHTML = page;
}

function renderDevPageAsString() {
  const devPage = 
  `<div class="container mx-auto my-4 bg-white">
    <div class="row justify-content-center my-4">
      <div class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-secondary">  
            <h3> Profil</h3> 
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 rounded-4 bg-light mx-2">
        <div class="d-flex justify-content-center my-5 py-2 bg-">
          <img src="frontend/src/img/Carré_rouge.png alt="" class="img-thumbnail">
        </div>
      </div>
      <div class="col rounded-4 bg-light mx-2">
        <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3  bg-secondary">  
            <h3>Informations generales</h3> 
        </div>
        <ul> 
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
          </ul>
        <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3   bg-secondary">
            <h3>Compétences </h3>
        </div>
          <ul> 
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
            <li>Java </li>
            <li>C#</li>
          </ul>
      </div>
    </div>
  </div>`;

  return devPage;
}

export default developerPage;
