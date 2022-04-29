import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

export const fetchApi = async(url) => {

   const { data } = await axios.get((url), {
      headers: {
         'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
         'X-RapidAPI-Key': '57632d7b09mshf90615e07888caap1e3c8cjsn50a0393fd782'
   }})

   return data
}