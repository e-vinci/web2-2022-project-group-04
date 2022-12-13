import { clearPage, renderPageTitle } from '../../utils/render';
import { getAuthenticatedUser } from '../../utils/auths';


const developerPage = () => {
  clearPage();
  renderPageTitle('Dev Page');
  renderDevPage();
};

 async function renderDevPage() {
  
  const descriptionDev= await getDescriptionDev();
  const listLanguages = await getAllLanguages();
  const masteredLanguagesDev= await getmasteredLanguageByIdDev(listLanguages);


  const main = document.querySelector('main');
  main.innerHTML = descriptionDev+ masteredLanguagesDev;
}

async function getDescriptionDev() {
  try {
    const idUser=getAuthenticatedUser().id;
    const response = await fetch(`/api/developers/profileDev/${idUser}`);
    
    if (!response.ok){
     throw new Error('fetch error : ', response.status, response.statusText);
    }
    const description = await response.json();
    // eslint-disable-next-line no-console
    return renderDescription(description);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CompanyPageDev  error: ', error);
    throw error;
  }
}

async function getmasteredLanguageByIdDev(listLanguages) {

    const idUser=getAuthenticatedUser().id;
    const response = await fetch(`/api/developers/masteredLanguageDev/${idUser}`);

    if (!response.ok) return masterLanguages(undefined);

    console.log(1 + listLanguages);
    const listLanguages2 = await listLanguages;
    const description = await response.json();
    console.log(2 + listLanguages2);

    // eslint-disable-next-line no-console
    return masterLanguages(description,listLanguages2);
  
}

  async function getAllLanguages() {
    try {

      const response = await fetch(`/api/developers/getAllLanguages`);
      
      if (!response.ok){
       throw new Error('fetch error : ', response.status, response.statusText);
      }
      const description = await response.json();
      // eslint-disable-next-line no-console
      return renderAlllanguages(description);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ALl languages in devPage  error: ', error);
      throw error;
    }
  }

function renderAlllanguages(listLanguages){

  listLanguages?.forEach((language) => { const list =  `
  
  <div class="form-group">
                                <label for="">Type d'offre</label>
                                <select id="idOffer">
                                <option value="${language.id_language}">${language.language}</option>
                                    </select>
                            </div>
    `;

  
return list;
});

}


 function renderDescription(description) {

  const descriptionDev =  renderGenerealsInfosDev(description);


  return descriptionDev;
}

function masterLanguages(languages,listLanguages) {

  const masteredLanguagesDev =  renderMasteredlanguageDev(listMasteredlanguage(languages),listLanguages);

  return masteredLanguagesDev;
}

 function renderGenerealsInfosDev(description) {

  const descriptionString = `
  
  <div class="container mx-auto my-4 bg-white">
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
          <li> ${description.lastname}   </li>
          <li> ${description.firstname}  </li>
          <li> ${description.birth_date} </li>
          <li>${description.tel}    </li>
        </ul>
    `
    ;
  return descriptionString;
}

function renderMasteredlanguageDev(listMasteredlanguages,listLanguages) {



  const descriptionString = `
  
  <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3   bg-secondary">
            <h3>Compétences </h3>
        </div>
        <ul>
       ${listMasteredlanguages}  
       </ul>
        ${listLanguages}
       <form>
       <input type="text" id="inputLP" value="Inserez un langugae de programmation que vous maitrisez"><br>
       <input type="submit" value="Submit">
     </form> 

      </div>
    </div>

  </div>
  

  
  `;
          
  return descriptionString;
}

function listMasteredlanguage(listLanguage){


  if(!listLanguage){
    return  `<li>Vous n'avez aucune compétence en informatique</li>`
  }
  let listMasteredlanguag = '';

    listMasteredlanguag += `
      <li>${listLanguage.language}</li>`;
  
  return listMasteredlanguag;

}



export default developerPage;
