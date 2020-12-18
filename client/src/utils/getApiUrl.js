const getApiUrl = () => {
  console.log("in here");
  if (process.env.NODE_ENV === "production") {
    console.log("prod api url");
    return process.env.NEXT_PUBLIC_API_URL;
  } else {
    return "http://localhost:4200/api/v1";
  }
};

export default getApiUrl;
