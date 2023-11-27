import { useState } from 'react';
import fetchAny from './components/facade';

export const useFetch = () => {
  const [error, setError] = useState(null);

  const handleHttpErrors = async (res) => {
    if (!res.ok) { // Handles all non-2xx responses as a rejected promise and passes the response to the catch block which then passes it to the handleError function.
      return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
  }

  const makeOptions = (method, withToken, body) => {
    method = method ? method : 'GET';
    var opts = {
      method: method,
      headers: {
        ...(['PUT', 'POST'].includes(method) && { //using spread operator to conditionally add member to headers object.
          "Content-type": "application/json"
        }),
        "Accept": "application/json"
      }
    }
    if (withToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  }

  const fetchAny = async (
    url, 
    handleData, 
    handleError, 
    method, 
    withToken, 
    body) => {
    if (properties.backendURL) url = properties.backendURL + url;
    const options = makeOptions(method, withToken, body);
    try {
      const res = await fetch(url, options);
      const data = await handleHttpErrors(res);
      handleData(data);
    } catch (error) {
      if (error.status) {
        error.fullError.then(e => {if(handleError) handleError(error.status+': '+e.message)});
        console.log("ERROR:",error.status);
      }
      else { console.log("Network error"); }
    }
    console.log(options);
  }

  return { error, fetchAny };
}

export default fetchAny