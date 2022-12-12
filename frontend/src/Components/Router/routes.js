import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import RegisterFormPage from '../Pages/RegisterPage';
import HomePageDev from '../Pages/HomePageDev';
import DevPage from '../Pages/DevPage';
import CreateOfferFormPage from '../Pages/CreateOfferFormPage';
import CompanyPage from '../Pages/CompanyPage';
import Logout from '../Logout/Logout';
import HomePageComany from '../Pages/HomePageCompany'

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/new': NewPage,
  '/register' : RegisterFormPage,
  '/jobOffers' : HomePageDev,
  '/devPage'  : DevPage,
  '/createOfferPage' : CreateOfferFormPage,
  '/companyPage' : CompanyPage,
  '/logout': Logout,
  '/homePageCompany' : HomePageComany

 };

export default routes;
