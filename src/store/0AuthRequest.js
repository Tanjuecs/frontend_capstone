import axios from 'axios'

export default axios.create({
    // baseURL: 'https://capstonebackend20210621232104.azurewebsites.net', // live site
    
    // baseURL: 'https://localhost:44370',// local host site
    baseURL:'https://backendcapstone20210728232640.azurewebsites.net',
     headers: {
         "Content-type" : "application/json",
         "authapp" : "Basic:793bb6c2-4807-4805-a092-0a91d5ff62d7"
     }
})