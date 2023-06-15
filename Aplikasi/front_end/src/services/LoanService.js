import http from "../http-common";

const getAll = () => {
  return http.get("/pinjam");
};

const get = (id) => {
  return http.get(`/pinjam/${id}`);
};

const create = (data) => {
  return http.post("/pinjam", data);
};

const update = (id, data) => {
  return http.put(`/pinjam/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/pinjam/${id}`);
};

const removeAll = () => {
  return http.delete(`/pinjam`);
};

const findByTitle = (title) => {
  return http.get(`/pinjam?title=${title}`);
};

const LoanService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default LoanService;
