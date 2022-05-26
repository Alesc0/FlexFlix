import axios from "axios";

export const baseUrl = "http://localhost:3000";
export const imagesUrl = "http://localhost:3000/images";
export default axios.create({
  baseURL: baseUrl,
});
