import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginPage from '../Pages/LoginPage';
import RegisterPage from '../Pages/RegisterPage';
import HomePageDev from '../Pages/HomePageDev';

const routes = {
  '/': HomePage,
  '/login': LoginPage,
  '/new': NewPage,
  '/registerPage' : RegisterPage,
  '/jobOffers' : HomePageDev
};

export default routes;
