import axios from "./client";

export const getPlanets = async (page) => {
  const { data } = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
  return data;
};

export const getPeople = async (page) => {
  const { data } = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
  return data;
};
