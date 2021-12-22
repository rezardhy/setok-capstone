import Home from '../views/pages/home';
import Forum from '../views/pages/forum';
import Profil from '../views/pages/profil';
import Masuk from '../views/pages/masuk';
import Daftar from '../views/pages/daftar';
 
const routes = {
  '/': Home, // default page
  '/forum': Forum,
  '/profil': Profil,
  '/masuk' : Masuk,
  '/daftar': Daftar,
};
 
export default routes;