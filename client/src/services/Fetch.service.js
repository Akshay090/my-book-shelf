import axios from "axios";
import Cookies from "universal-cookie";

class FetchService {
  postData(url, data) {
    return axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: form_data,
    })
      .then((resp) => {
        console.log(resp, "api");
        const { data, statusText } = resp;
        console.log(data, statusText);
        return { data, statusText };
      })
      .catch((error) => {
        console.log(error.message, "in post");
        const errorResp = error.response.data;
        throw errorResp;
      });
  }

  postFormDataAuthed(url, data) {
    const cookies = new Cookies();
    const token = cookies.get("token");

    return axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((resp) => {
        const { data, statusText } = resp;
        console.log(data, statusText);
        return { data, statusText };
      })
      .catch((error) => {
        console.log(error.message, "in postauth");
        const errorResp = error.response.data;
        throw errorResp;
      });
  }

  getData(url) {
    return axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_URL}${url}`,
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
}

export default new FetchService();
