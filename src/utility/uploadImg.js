import axios from "axios";

const UploadImage = (image) => {
  let body = new FormData();
  body.set("key", import.meta.env.VITE_IMGBB_API_KEY);
  body.append("image", image);
  return axios.post(import.meta.env.VITE_IMGBB_API, body);
};

export default UploadImage;
