import { clearPage, renderPageTitle } from '../../utils/render';

const LoginPage = () => {
    clearPage();
    renderPageTitle('Login');
    renderLoginPage();

  };
  

  function renderLoginPage(){

     const main = document.querySelector('main');
    main.innerHTML =
     `
    <label for="inputPassword5" class="form-label">Password</label>
<input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
<div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</div>
`
  }







  export default LoginPage;
