import axiosInstance from "./axiosInstance";

const request = async (path, body) => {
  try {
    const response = body(path);
    return response;
  } catch (e) {
    console.error("Request error: ", e.message || e);
  }
};

export const post = async (path, data) => {
  return await request(path, async (axios, url) => {
    return await axios.post(url, data);
  });
};

export const get = async (path, params = {}) => {
  return await request(path, async (axios, url) => {
    return await axios.get(url, { params });
  });
};

export const patch = async (path, data) => {
  return await request(path, async (axios, url) => {
    return await axios.patch(url, data);
  });
};
