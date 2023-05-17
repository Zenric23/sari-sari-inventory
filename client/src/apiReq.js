import axios from 'axios'

 const apiReq = axios.create({
    baseURL: 'http://localhost:5000',
  });


  export default apiReq