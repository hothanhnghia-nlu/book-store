import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000';

const fetchNewBooks = async () => {
  try {
    const url = `${baseUrl}/books/news`;
    const response = await axios.get(url);
    return response; 

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

const fetchPopularBooks = async () => {
  try {
    const url = `${baseUrl}/books/popular`;
    const response = await axios.get(url);
    return response; 

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

const fetchRankBooks = async () => {
  try {
    // const url = `${baseUrl}/books/rank`;
    const url = `${baseUrl}/books`;
    const response = await axios.get(url);
    return response; 

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

const fetchReadMoreBooks = async () => {
  try {
    // const url = `${baseUrl}/books/rank`;
    const url = `${baseUrl}/books`;
    const response = await axios.get(url);
    return response; 

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

const categoryBooks = async () => {
  try {

    const url = `${baseUrl}/category`;
    const response = await axios.get(url);
    return response; 

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export default {
  fetchNewBooks,fetchPopularBooks,fetchRankBooks,fetchReadMoreBooks,categoryBooks
};

 