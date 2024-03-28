import axios from 'axios';
import getEnv from "./util"

// require('dotenv').config()
console.log(getEnv())
const BASE_URL = getEnv().REACT_APP_VITE_POTLUCK_SERVER + '/_api';

function getAuthEmail() {
  return localStorage.getItem('email');
}

function getHeaders() {
  const email = getAuthEmail();
  if (!!email) {
    return { "Authorization": "email " + email }
  }
  return {}
}

const createEvent = (eventData) => {
  return axios.post(`${BASE_URL}/events`, eventData , { headers: getHeaders() });
};

const editEvent = (id, eventData) => {
  return axios.patch(`${BASE_URL}/events/${id}`, eventData , { headers: getHeaders() });
};

const userDietRestrictions = (email, diet) => {
  return axios.patch(`${BASE_URL}/users/${email}/userAttributes`, diet , { headers: getHeaders() });
};

const getEvents = (email) => {
  if (!!email) {
    return axios.get(`${BASE_URL}/events/${email}`, { headers: getHeaders() });
  }
  return axios.get(`${BASE_URL}/events`, { headers: getHeaders() });
};

export {
  createEvent,
  editEvent,
  getEvents,
  userDietRestrictions
};
