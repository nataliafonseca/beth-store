import { defineStore } from "pinia";
import { api, fakeApi } from "@/services/api";
import { toastError } from "@/utils/toast";

export const userStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    auth_token: null,
    userForm: {
      email: "",
      name: "",
      password: "",
      phone: "",
      cpf: "",
      cep: "",
      district: "",
      city: "",
      state: "",
      street: "",
      number: "",
      complement: "",
    },
  }),

  actions: {
    loadUser() {
      const existingUser = localStorage.getItem("bethstore.user");
      if (existingUser) {
        this.user = JSON.parse(existingUser);
        this.fillUserForm();
        this.isAuthenticated = true;
        if (this.user.roles.includes("ADMIN")) this.isAdmin = true;
        this.auth_token = localStorage.getItem("bethstore.auth_token");
      }
    },

    fillUserForm() {
      this.userForm = {
        email: this.user.email,
        name: this.user.name,
        password: "",
        phone: this.user.phone,
        cpf: this.user.cpf,
        cep: this.user.cep,
        district: this.user.district,
        city: this.user.city,
        state: this.user.state,
        street: this.user.street,
        number: this.user.number,
        complement: this.user.complement,
      };
    },

    clearUserForm() {
      this.userForm = {
        email: "",
        name: "",
        password: "",
        phone: "",
        cpf: "",
        cep: "",
        district: "",
        city: "",
        state: "",
        street: "",
        number: "",
        complement: "",
      };
    },

    async fakeLogin({ email, password }) {
      try {
        const response = await fakeApi.get("users");
        const user = response.data.find((user) => user.email === email);

        if (!user || user.password !== password)
          throw new Error("Email/senha incorretos.");

        this.user = user;
        localStorage.setItem("bethstore.user", JSON.stringify(this.user));

        this.isAuthenticated = true;
        if (this.user.roles.includes("ADMIN")) this.isAdmin = true;

        this.router.push({ name: "orders" });
      } catch (error) {
        toastError(error.message);
      }
    },

    async fakeRegister() {
      try {
        await fakeApi.post("users", { ...this.userForm, roles: ["CLIENTE"] });
        await this.fakeLogin({
          email: this.userForm.email,
          password: this.userForm.password,
        });
      } catch (error) {
        toastError(error.message);
      }
    },

    async fakeUpdate(id) {
      try {
        await fakeApi.put(`user/${id}`, {
          ...this.userForm,
          roles: ["CLIENTE"],
        });
      } catch (error) {
        toastError(error.message);
      }
    },

    async login({ email, password }) {
      try {
        const response = await api.post("login", { email, senha: password });
        console.log(response);
        console.log(response.headers);
        console.log(response.headers.authorization);
        console.log(response.headers.userid);

        this.auth_token = response.headers.authorization;
        localStorage.setItem("bethstore.auth_token", this.auth_token);

        // const userid = response.headers.userid;
        const userResponse = await api.get(`usuarios/1`, {
          headers: {
            Authorization: this.auth_token,
          },
        });

        this.user = {
          id: 1,
          email: userResponse.data.email,
          name: userResponse.data.nome,
          phone: userResponse.data.telefones[0],
          cpf: userResponse.data.cpfOuCnpj,
          cep: userResponse.data.enderecos[0].cep,
          district: userResponse.data.enderecos[0].bairro,
          city: userResponse.data.enderecos[0].cidade,
          state: userResponse.data.enderecos[0].estado,
          street: userResponse.data.enderecos[0].logradouro,
          number: userResponse.data.enderecos[0].numero,
          complement: userResponse.data.enderecos[0].complemento,
          roles: userResponse.data.perfis,
        };
        this.fillUserForm();

        this.isAuthenticated = true;
        if (this.user.roles.includes("ADMIN")) this.isAdmin = true;

        localStorage.setItem("bethstore.user", JSON.stringify(this.user));

        this.router.push({ name: "orders" });
      } catch (error) {
        localStorage.removeItem("bethstore.auth_token");
        localStorage.removeItem("bethstore.user");
        toastError(error.response.data.message);
      }
    },

    logout() {
      localStorage.removeItem("bethstore.auth_token");
      localStorage.removeItem("bethstore.user");
      this.user = null;
      this.clearUserForm();
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.router.push({ name: "home" });
    },
  },
});
