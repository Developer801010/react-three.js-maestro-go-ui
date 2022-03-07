import http from "../components/IntelooCommon/http-common";
const getAll = () => {
  return http.get("../pages/inteloo/inteloo-search");
};
const get = id => {
  return http.get(`../pages/inteloo/inteloo-search/${id}`);
};
const create = data => {
  return http.post("../pages/inteloo/inteloo-search/", data);
};
const update = (id, data) => {
  return http.put(`../pages/inteloo/inteloo-search/${id}`, data);
};
const remove = id => {
  return http.delete(`../pages/inteloo/inteloo-search/${id}`);
};
const removeAll = () => {
  return http.delete(`../pages/inteloo/inteloo-search`);
};
const findByTitle = title => {
  return http.get(`../pages/inteloo/inteloo-search?title=${title}`);
};
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
