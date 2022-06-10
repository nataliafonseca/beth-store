import { defineStore } from "pinia";
import { api } from "@/services/api";
import { toastError, toastSuccess } from "../utils/toast";
import { toValidPrice, toPriceString } from "../utils/textMasks";
import { mapStores } from "pinia";
import { userStore } from "@/store/userStore";

export const productStore = defineStore("product", {
  state: () => ({
    categories: [],
    products: [],
    visibleProducts: [],
    cart: [],
    isCartVisible: false,
    productForm: {
      description: "",
      brand: "",
      model: "",
      price: "",
      quantity: "",
      size: "",
      specs: "",
      category_id: "",
      picture: [],
    },
    categoryForm: {
      description: "",
      sector: "",
    },
  }),
  getters: mapStores(userStore),

  actions: {
    loadCart() {
      const existingCart = localStorage.getItem("bethstore.cart");
      if (existingCart) this.cart = JSON.parse(existingCart);
    },

    async loadProducts() {
      this.loadCart();

      const response = await api.get("/produtos");

      this.products = response.data
        .map((p) => {
          const productInCart = this.cart.find(
            (item) => item.product_id === p.id
          );

          if (productInCart)
            p.remaining = p.estoque.quantidade - productInCart.count;
          else p.remaining = p.estoque.quantidade;

          const product = {
            id: p.id,
            category_id: p.categoria.id,
            description: p.nome,
            brand: p.marca,
            model: p.modelo,
            price: p.preco,
            quantity: p.estoque.quantidade,
            remaining: p.remaining,
            size: p.estoque.tamanho,
            specs: p.informacoesTecnicas,
            picture: p.imageUrl,
          };

          return product;
        })
        .sort((a, b) => (b.id < a.id ? 1 : -1));
    },

    async createProduct() {
      try {
        await api.post(
          "produtos",
          {
            nome: this.productForm.description,
            marca: this.productForm.brand,
            modelo: this.productForm.model,
            preco: toValidPrice(this.productForm.price),
            quantidade: parseInt(this.productForm.quantity),
            tamanho: this.productForm.size,
            informacoesTecnicas: this.productForm.specs,
            categoria: {
              id: this.productForm.category_id,
            },
          },
          {
            headers: {
              Authorization: this.userStore.authToken,
            },
          }
        );

        await this.loadProducts();
        toastSuccess("Produto cadastrado com sucesso!");
        this.router.push({ name: "product-table" });

        setTimeout(() => {
          this.clearProductForm();
        }, 1000);
      } catch (err) {
        toastError(err.response.data.message);
      }
    },

    async uploadProductPicture(id) {
      const formData = new FormData();
      formData.append("file", this.productForm.picture[0]);
      try {
        await api.post(`produtos/picture/${id}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        await this.loadProducts();
      } catch (err) {
        toastError(err.response.data.message);
      }
    },

    async updateProduct(id) {
      const updatedProduct = {
        nome: this.productForm.description,
        marca: this.productForm.brand,
        modelo: this.productForm.model,
        preco: toValidPrice(this.productForm.price),
        quantidade: parseInt(this.productForm.quantity),
        tamanho: this.productForm.size,
        informacoesTecnicas: this.productForm.specs,
        categoria: {
          id: this.productForm.category_id,
        },
      };

      try {
        await api.put(`produtos/${id}`, updatedProduct, {
          headers: {
            Authorization: this.userStore.authToken,
          },
        });

        await this.loadProducts();

        if (this.productForm.picture.length) this.uploadProductPicture(id);

        toastSuccess("Produto atualizado com sucesso!");
        this.router.push({ name: "product-table" });

        setTimeout(() => {
          this.clearProductForm();
        }, 1000);
      } catch (err) {
        toastError(err.response.data.message);
      }
    },

    async deleteProduct(id) {
      if (
        window.confirm(
          "Tem certeza que deseja remover o produto? Essa ação é irreversível!"
        )
      ) {
        try {
          await api.delete(`produtos/${id}`);
          await this.loadProducts();
          toastSuccess("Produto removido com sucesso!");
          // router.push({ name: "product-table" });
        } catch (err) {
          toastError(err.response.data.message);
        }
      }
    },

    fillProductForm(id) {
      const product = this.getProductById(id);

      this.productForm = {
        description: product.description,
        brand: product.brand,
        model: product.model,
        price: toPriceString(product.price),
        quantity: product.quantity,
        size: product.size,
        specs: product.specs,
        category_id: product.category_id,
      };
    },

    clearProductForm() {
      this.productForm = {
        description: "",
        brand: "",
        model: "",
        price: "",
        quantity: "",
        size: "",
        specs: "",
        category_id: "",
        picture: [],
      };
    },

    async loadCategories() {
      const response = await api.get("/categorias");
      this.categories = response.data
        .map((category) => ({
          id: category.id,
          description: category.nome,
          sector: category.setor,
        }))
        .sort((a, b) => (b.id < a.id ? 1 : -1));
    },

    async createCategory() {
      try {
        await api.post("categorias", {
          nome: this.createCategory.description,
          setor: this.createCategory.sector,
        });

        await this.loadCategories();
        toastSuccess("Categoria cadastrada com sucesso!");
        this.router.push({ name: "category-table" });

        setTimeout(() => {
          this.clearCategoryForm();
        }, 1000);
      } catch (err) {
        toastError(err.response.data.message);
      }
    },

    async updateCategory(id) {
      try {
        await api.put(`categorias/${id}`, {
          nome: this.categoryForm.description,
          setor: this.categoryForm.sector,
        });

        await this.loadCategories();
        toastSuccess("Categoria atualizada com sucesso!");
        this.router.push({ name: "category-table" });

        setTimeout(() => {
          this.clearCategoryForm();
        }, 1000);
      } catch (err) {
        toastError(err.response.data.message);
      }
    },

    async deleteCategory(id) {
      if (
        window.confirm(
          "Tem certeza que deseja remover a categoria? Essa ação é irreversível!"
        )
      ) {
        try {
          await api.delete(`categorias/${id}`);
          await this.loadCategories();
          toastSuccess("Categoria removida com sucesso!");
          // router.push({ name: "category-table" });
        } catch (err) {
          toastError(err.response.data.message);
        }
      }
    },

    fillCategoryForm(id) {
      const category = this.getCategoryById(id);
      this.categoryForm = {
        description: category.description,
        sector: category.sector,
      };
    },

    clearCategoryForm() {
      this.categoryForm = {
        description: "",
        sector: "",
      };
    },

    filterProducts(category, search) {
      let products = this.products;

      if (category !== "-1") {
        products = products.filter(
          (product) => product.category_id === parseInt(category)
        );
      }

      if (search !== "") {
        products = products.filter(
          (product) =>
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.model.toLowerCase().includes(search.toLowerCase()) ||
            product.brand.toLowerCase().includes(search.toLowerCase()) ||
            product.size.toLowerCase().includes(search.toLowerCase()) ||
            product.specs?.toLowerCase().includes(search.toLowerCase())
        );
      }

      this.visibleProducts = products;
    },

    getProductById(id) {
      return this.products.find((product) => product.id === parseInt(id));
    },

    getCategoryById(id) {
      return this.categories.find((category) => category.id === parseInt(id));
    },

    getCartItemById(id) {
      return this.cart.find((item) => item.product_id === id);
    },

    addToCart(product_id) {
      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      const itemInCart = this.cart.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart && product.remaining > 0) {
        itemInCart.count++;
        product.remaining--;
      } else if (product.remaining > 0) {
        this.cart.push({ product_id: product.id, count: 1 });
        product.remaining--;
      }

      localStorage.setItem("bethstore.cart", JSON.stringify(this.cart));
    },

    subtractFromCart(product_id) {
      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      const itemInCart = this.cart.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart && itemInCart.count > 0) {
        itemInCart.count--;
        product.remaining++;
      }

      if (itemInCart.count === 0) {
        this.removeFromCart(product_id);
      }

      localStorage.setItem("bethstore.cart", JSON.stringify(this.cart));
    },

    removeFromCart(product_id) {
      this.cart = this.cart.filter((item) => item.product_id !== product_id);

      const product = this.products.find(
        (product) => product.id === product_id
      );
      if (!product) return;

      product.remaining = product.quantity;

      localStorage.setItem("bethstore.cart", JSON.stringify(this.cart));
    },

    clearCart() {
      localStorage.removeItem("bethstore.cart");
      this.cart = [];
      this.products.map((product) => {
        product.remaining = product.quantity;
        return product;
      });
    },

    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },

    openCart() {
      this.isCartVisible = true;
    },

    closeCart() {
      this.isCartVisible = false;
    },
  },
});
