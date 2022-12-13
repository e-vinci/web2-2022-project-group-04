import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import RegisterFormPage from '../Pages/RegisterPage';
import HomePageDev from '../Pages/HomePageDev';
import DevPage from '../Pages/DevPage';
import CreateOfferFormPage from '../Pages/CreateOfferFormPage';
import CompanyPage from '../Pages/CompanyPage';
import Logout from '../Logout/Logout';
import HomePageComany from '../Pages/HomePageCompany'
import Swipe from '../Pages/Swipe';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/register' : RegisterFormPage,
  '/jobOffers' : HomePageDev,
  '/devPage'  : DevPage,
  '/createOfferPage' : CreateOfferFormPage,
  '/companyPage' : CompanyPage,
  '/logout': Logout,
  '/homePageCompany' : HomePageComany,
  '/swipe' : Swipe
 };

export default routes;
