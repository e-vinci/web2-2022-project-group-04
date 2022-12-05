import { clearPage, renderPageTitle } from '../../utils/render';

const developerPage = () => {
  clearPage();
  renderPageTitle('Dev Page');

  renderDevPage();
};

function renderDevPage() {
  const page = renderDevPageAsString();
  const main = document.querySelector('main');
  main.style = '';
  main.innerHTML += page;
}

function renderDevPageAsString() {
  const devPage = `<div class="container mx-auto bg-light">
    
   
    <h3> Information generale</h3>
    
    <h3> Compétences </h3>
    <ul> 
    <li>Java </li>
    <li>C#</li>
    </ul>
    </div>
    </div>`;

  return devPage;
}

export default developerPage;
