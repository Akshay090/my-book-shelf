import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

class TokenService {
  saveData(token) {
    const { sessionToken, userInfo } = this.processToken(token);
    console.log("saving cookie", sessionToken, userInfo);
    const cookies = new Cookies();
    cookies.set("token", sessionToken, { path: "/" });
    cookies.set("userInfo", userInfo, { path: "/" });
    return Promise.resolve();
  }

  deleteData() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
    cookies.remove("userInfo", { path: "/" });
  }

  processToken(token) {
    const sessionToken = atob(token);
    const userInfo = jwt_decode(sessionToken);
    return { sessionToken, userInfo };
  }

  get userInfo() {
    const cookies = new Cookies();
    return cookies.get("userInfo");
  }
}

export default TokenService;
