import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

export const getAllPokemon = (limit: number = 10, offset: number = 0) => {
  return axios
    .get(`${API_URL}pokemon?limit=${limit}&offset=${offset}`)
    .then((response) => {
      const data = response.data
      // data.forEach(item => {
      //   getOnePokemon(item.)
      // });
    })
}

export const getOnePokemon = (id: number) => {
  return axios.get(`${API_URL}pokemon/${id}`)
}
