import { defineStore } from "pinia";
import { api } from "@/services/api";
import { toastError } from "@/utils/toast";
import {
  toCepString,
  toCpfString,
  toPhoneString,
  numbersOnly,
} from "@/utils/textMasks";

export const userStore = defineStore("user", {
  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
    user: null,
    authToken: null,
    userForm: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
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
        this.authToken = localStorage.getItem("bethstore.auth_token");
      }
    },

    fillUserForm() {
      this.userForm = {
        email: this.user.email,
        name: this.user.name,
        password: "",
        passwordConfirmation: "",
        phone: toPhoneString(this.user.phone),
        cpf: toCpfString(this.user.cpf),
        cep: toCepString(this.user.cep),
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
        passwordConfirmation: "",
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

    async register() {
      const newUser = {
        bairro: this.userForm.district,
        cep: numbersOnly(this.userForm.cep),
        cidade: this.userForm.city,
        complemento: this.userForm.complement,
        cpfOuCnpj: numbersOnly(this.userForm.cpf),
        email: this.userForm.email,
        estado: this.userForm.state,
        logradouro: this.userForm.street,
        nome: this.userForm.name,
        numero: this.userForm.number,
        senha: this.userForm.password,
        telefone1: numbersOnly(this.userForm.phone),
        tipo: 1,
      };
      try {
        await api.post("usuarios", newUser);
        await this.login({
          email: this.userForm.email,
          password: this.userForm.password,
        });
      } catch (error) {
        toastError(error.response.data.message);
      }
    },

    async update(id) {
      try {
        console.log(id);
        await api.put(
          `usuarios`,
          {
            bairro: this.userForm.district,
            cep: numbersOnly(this.userForm.cep),
            cidade: this.userForm.city,
            complemento: this.userForm.complement,
            cpfOuCnpj: numbersOnly(this.userForm.cpf),
            email: this.userForm.email,
            estado: this.userForm.state,
            logradouro: this.userForm.street,
            nome: this.userForm.name,
            numero: this.userForm.number,
            senha: this.userForm.password,
            telefone1: numbersOnly(this.userForm.phone),
            tipo: 1,
          },
          {
            headers: {
              Authorization: this.authToken,
            },
          }
        );
      } catch (error) {
        toastError(error.message);
      }
    },

    async login({ email, password }) {
      try {
        const response = await api.post("login", { email, senha: password });

        this.authToken = response.headers.authorization;
        localStorage.setItem("bethstore.auth_token", this.authToken);

        // const userid = response.headers.userid;
        const userResponse = await api.get(`usuarios/find`, {
          headers: {
            Authorization: this.authToken,
          },
        });

        this.user = {
          id: userResponse.data.id,
          email: userResponse.data.email,
          name: userResponse.data.nome,
          phone: userResponse.data.telefones[0],
          cpf: userResponse.data.cpfOuCnpj,
          cep: userResponse.data.cep,
          district: userResponse.data.bairro,
          city: userResponse.data.cidade,
          state: userResponse.data.estado,
          street: userResponse.data.logradouro,
          number: userResponse.data.numero,
          complement: userResponse.data.complemento,
          roles: userResponse.data.perfis,
        };
        this.fillUserForm();

        this.isAuthenticated = true;
        if (this.user.roles.includes("ADMIN")) this.isAdmin = true;

        localStorage.setItem("bethstore.user", JSON.stringify(this.user));

        this.router.push({ name: "home" });
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
