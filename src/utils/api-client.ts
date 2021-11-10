const apiURL = "https://newsapi.org/v2";
const apiKEY = process.env.REACT_APP_API_KEY

async function client({endpoint= "top-headlines?country=fr", category= ""}) {
  return window.fetch(`${apiURL}/${endpoint}&category=${category}&apiKey=${apiKEY}`).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
}

export { client };
