import { clearPage } from '../../utils/render';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

const developerPage = () => {
  if(isAuthenticated()){
    renderDevPage();
  }else{
    Navigate('/');
  }
  
};

 async function renderDevPage() {

  const descriptionDev= await getDescriptionDev();
  const masteredLanguagesDev= await getmasteredLanguageByIdDevandGetAllLanguages();
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = descriptionDev+ masteredLanguagesDev;
  const form = document.getElementById('test');
  form.addEventListener('submit',addLangageEvent);
}

async function getDescriptionDev() {
  try {
    const idUser=getAuthenticatedUser().id;
    const { token } = getAuthenticatedUser();
    const options = {
      headers: {
        authorization: token
      }
      
    }

    let descriptionDev = await fetch(`/api/developers/profileDev/${idUser}`, options);
    
    if (!descriptionDev.ok){
     throw new Error('fetch error : ', descriptionDev.status, descriptionDev.statusText);
    }
    descriptionDev = await descriptionDev.json();

    return renderDescriptionDev(descriptionDev);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('pageDev  error: ', error);
    throw error;
  }
}


async function getmasteredLanguageByIdDevandGetAllLanguages() {

    const idUser=getAuthenticatedUser().id;
    const { token } = getAuthenticatedUser();
    const options = {
      headers: {
        authorization: token
      }
      
    }

    let masteredLanguages = await fetch(`/api/developers/masteredLanguageDev/${idUser}`, options);

    const listLanguages = await getAllLanguages();

    if (!masteredLanguages.ok) return masteredLanguageByIdDevandGetAllLanguages(undefined,listLanguages);

    masteredLanguages = await masteredLanguages.json();

    // eslint-disable-next-line no-console
    return masteredLanguageByIdDevandGetAllLanguages(masteredLanguages,listLanguages);
  
}

  async function getAllLanguages() {
    try {

      let allLanguages = await fetch(`/api/developers/getAllLanguages`);
      
      if (!allLanguages.ok){
       throw new Error('fetch error : ', allLanguages.status, allLanguages.statusText);
      }
      allLanguages = await allLanguages.json();
      
      return renderAlllanguages(allLanguages);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('ALl languages in devPage  error: ', error);
      throw error;
    }
  }




 function renderDescriptionDev(description) {
  const descriptionDev =  `
  
  <div class="container mx-auto my-4 bg-info">
  <div class="row justify-content-center my-4 bg-info">
    <div class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-info"> 
      <div class="align-self-baseline"><h3 >Mon profil</h3></div>
    </div>
  <div class="row justify-content-center my-4 bg-info">
    <div id="contIm" class="container-sm py-2 px-4 m-3 w-auto m-0 rounded-4  bg-muted"> 
      <div id="idImageDevPage" class="align-self-baseline" alt="">
    </div>
  </div>
  <div class="row">
    <div class="col-lg-3 rounded-4 bg-muted mx-2 bg-info">
      <div class="d-flex justify-content-center my-5 py-2 bg-info">
      </div>
      
    </div>
    <div class="col rounded-4 bg-muted mx-2 bg-info">
      <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3  bg-info">  
          <h3>Informations generales</h3> 
      </div>
      <ul class="infoDev"> 
          <li>Prénom : ${description.lastname}   </li>
          <li>Nom : ${description.firstname}  </li>
          <li>Date de naissance : ${new Date(description.birth_date).toLocaleDateString()} </li>
          <li>Numero de téléphone : ${description.tel}    </li>
          <li>Adresse email : ${description.mail}    </li>
          <li>Type d'offre recherché : ${description.type_offer}    </li>
        </ul>
    `
  return descriptionDev;
}


function masteredLanguageByIdDevandGetAllLanguages(languages,listLanguages) {

  const masteredLanguagesDev =  renderMasteredlanguageDev(listMasteredlanguage(languages),listLanguages);

  return masteredLanguagesDev;
}

 

function renderMasteredlanguageDev(listMasteredlanguages,listLanguages) {



  const descriptionString = `
  
  <div class="container-sm py-2 px-4 mx-5 mt-4 mb-2 w-50 rounded-3 bg-info">
            <h3>Langages informatiques </h3>
        </div>
        <ul class="infoDev">
       ${listMasteredlanguages}  
       </ul>
        ${listLanguages}
      </div>
    </div>

  </div>
  

  
  `;
          
  return descriptionString;
}

function listMasteredlanguage(listLanguage){

console.log(listLanguage);
  if(!listLanguage){
    return  `<li>Vous n'avez ajoutez aucun language de programmation</li>`
  }

  let listMasteredlanguag = '';

    listLanguage?.forEach((language) => {  listMasteredlanguag  += `
      <li>${language.language}</li>`;
  
 

});
return listMasteredlanguag;
}

function renderAlllanguages(listLanguages){
  let list = `

  <form  id="test" class="form-group" >
  <div class = "box"  >
                                <label style="font-family: Arial" for="">Ajouter un language à mes compétences</label> <br>
                                <select id="idLanguage">
                                    `;

listLanguages?.forEach((language) => {  list += `

<option value="${language.id_language}">${language.language}</option>
 `;  
 });

list +=  `



</select>
</div>
<br>
<input id="inputDevPage"  type="submit" value = "AJOUTER"/>

</form>
`;
return list;
}



async function addLangageEvent(e){
  e.preventDefault();
  const idLanguage = document.getElementById('idLanguage').value
  const idDev = getAuthenticatedUser().id;
  const { token } = getAuthenticatedUser();
   
  const options = {
    method: 'POST',
    body: JSON.stringify({
      idDev,
      idLanguage,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
  };

  const response = await fetch('/api/developers/addLanguageProgramationToDev', options);

  if (!response.ok){
   throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  }

  Navbar();
  Navigate('/devPage');
  window.location.reload()
}


export default developerPage;
