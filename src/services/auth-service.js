//import required lib
import * as jwt from "jsonwebtoken";
import * as moment from "moment";

class AuthService {
  tokenKey = "auth_token";

  //get token from local storage
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  //get the expiration time of the token
  getExpiration(token) {
    const decodedToken = jwt.decode(token);
    //convert time using moment
    //refer to https://github.com/moment/moment
    return moment.unix(decodedToken.exp);
  }

  //check if the token is still valide
  isValid(token) {
    //check if current time is less than the token expiration time
    //e.g   2018/01/01 12:50  < 2018/01/01 13:50   which is a valid token
    //refer to https://github.com/moment/moment
    return moment().isBefore(this.getExpiration(token));
  }

  //validation
  isAuthenticated() {
    const token = this.getToken();

    return token && this.isValid(token) ? true : false;
  }

  //remove token from storage
  invalidateUser() {
    localStorage.removeItem(this.tokenKey);
  }

  //save token to localStorage
  saveToken(token) {
    localStorage.setItem(this.tokenKey, token);
  }
}

export default new AuthService();
