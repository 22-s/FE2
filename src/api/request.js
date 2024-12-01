import axiosInstance from "./axiosInstance";

const request = async (path, method, data = {}, params = {}) => {
  try {
    console.log(`Request URL: ${axiosInstance.defaults.baseURL}${path}`);
    const response = await axiosInstance({
      url: path,
      method: method,
      data: method === "get" ? undefined : data,
      params: method === "get" ? params : undefined,
    });

    return response.data;
  } catch (e) {
    console.error("Request error: ", e.message || e.response?.data || e);
    throw e;
  }
};

export const post = async (path, data) => {
  return await request(path, "post", data);
};

export const get = async (path, params = {}) => {
  return await request(path, "get", {}, params);
};

export const patch = async (path, data) => {
  return await request(path, "patch", data);
};
