import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

class TokenService {
  saveData(token) {
    const { sessionToken, userInfo } = this.processToken(token);
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

  checkToken() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    return axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/checkToken`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => {
        const { data, statusText } = resp;
        return { data, statusText };
      })
      .catch((error) => {
        const errorResp = error.response.data;
        throw errorResp;
      });
  }

  get userInfo() {
    const cookies = new Cookies();
    return cookies.get("userInfo");
  }
  get token() {
    const cookies = new Cookies();
    return cookies.get("token");
  }
}

export default TokenService;
