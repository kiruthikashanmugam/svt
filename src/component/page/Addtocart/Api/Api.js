import axios from 'axios';

// Mock API URL
let API_URL = 'https://svt.know3.com/api/donationcat';

export default function callApi(endpoint, method = 'get', body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
}
