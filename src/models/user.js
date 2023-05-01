class User {
  #name;
  #email;
  #mobile;
  #id;
  #productos;
  
  constructor({ name = "", email = "", mobile = "", id = "", productos = [] }) {
    this.#name = name;
    this.#email = email;
    this.#mobile = mobile;
    this.#id = id;
    this.#productos = productos;
  }
  

  // Métodos de acceso para los atributos privados
  getName() {
    return this.#name;
  }

  getEmail() {
    return this.#email;
  }

  getMobile() {
    return this.#mobile;
  }

  getId() {
    return this.#id;
  }

  getProductos() {
    return this.#productos;
  }

  // Métodos de modificación para los atributos privados
  setName(name) {
    this.#name = name;
  }

  setEmail(email) {
    this.#email = email;
  }

  setMobile(mobile) {
    this.#mobile = mobile;
  }

  setId(id) {
    this.#id = id;
  }

  setProductos(productos) {
    this.#productos = productos;
  }
}

module.exports = User;