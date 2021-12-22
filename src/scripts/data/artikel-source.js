import API_ENDPOINT from '../globals/api-endpoint';
 
class ArtikelSource {
  static async articles() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.articles;
  }
 
}
 
export default ArtikelSource;