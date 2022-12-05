import { clearPage, renderPageTitle } from '../../utils/render';
import { setAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const LoginPage = () => {
    clearPage();
    renderPageTitle('Login');
    renderLoginPage();

  };
  

  function renderLoginPage(){

     const main = document.querySelector('main');
     
     const form = document.createElement('form');
     form.className = 'p-5';
     const email = document.createElement('input');
     email.type = 'text';
     email.id = 'username';
     email.placeholder = 'Indiquez votre adresse mail';
     email.required = true;
     email.className = 'form-control mb-3';
     const password = document.createElement('input');
     password.type = 'password';
     password.id = 'password';
     password.required = true;
     password.placeholder = 'Indiquez votre mot de passe';
     password.className = 'form-control mb-3';
     const submit = document.createElement('input');
     submit.value = 'Login';
     submit.type = 'submit';
     submit.className = 'btn btn-primary';
     form.appendChild(email);
     form.appendChild(password);
     form.appendChild(submit);
     main.appendChild(form);
     form.addEventListener('submit', Login);
  }


  async function Login(e) {
    e.preventDefault();
  
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
  
    const options = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    };
  
    const response = await fetch('/localhost3000/login', options);
  
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  
    const authenticatedUser = await response.json();
  
    // eslint-disable-next-line no-console
    console.log('Authenticated user : ', authenticatedUser);
  
    setAuthenticatedUser(authenticatedUser);
  
    Navbar();
  
    Navigate('/');
  }





  export default LoginPage;
