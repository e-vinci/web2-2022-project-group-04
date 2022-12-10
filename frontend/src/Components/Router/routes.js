import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import HomePageDev from '../Pages/HomePageDev';
import DevPage from '../Pages/DevPage';
import CreateOfferFormPage from '../Pages/CreateOfferFormPage';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/new': NewPage,
  '/register' : RegisterPage,
  '/jobOffers' : HomePageDev,
  '/devPage'  : DevPage,
  '/createOfferPage' : CreateOfferFormPage
 };

export default routes;
