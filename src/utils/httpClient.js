import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const http = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  timeout: 10000,
  timeoutErrorMessage: 'Timeout! Response too long',
});

const getHeaders = (secured) => {
  let options = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (secured) {
    options['Authorization'] = localStorage.getItem('token');
  }
  return options;
};

const GET = (url, isSecure = false, params = {}) => {
  return http.get(url, {
    headers: getHeaders(isSecure),
    params,
  });
  // promise handle
};

const POST = (url, data, isSecure = false, params = {}) => {
  return http.post(url, data, {
    headers: getHeaders(isSecure),
    params,
  });
};

const PUT = (url, data, isSecure = false, params = {}) => {
  return http.put(url, data, {
    headers: getHeaders(isSecure),
    params,
  });
};

const DELETE = (url, isSecure = false, params = {}) => {
  return http.delete(url, {
    headers: getHeaders(isSecure),
    params,
  });
};

const UPLOAD = (method, url, data, files = []) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    // Append files to formData
    files.forEach((file) => {
      formData.append('image', file, file.name);
    });

    // Append textual files to formData
    // Data will be a object
    for (let key in data) {
      formData.append(key, data[key]);
    }

    xhr.onreadystatechange = () => {
      // console.log('check status=>', xhr.status);
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      }
    };

    // use xhr method to send formData
    xhr.open(
      method,
      `${BASE_URL}/${url}?token=${localStorage.getItem('token')}`,
      true
    );
    xhr.send(formData);
  });
};

export const httpClient = {
  GET,
  POST,
  PUT,
  DELETE,
  UPLOAD,
};
