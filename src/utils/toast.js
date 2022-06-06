import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export function toastError(message) {
  createToast(
    {
      title: "Erro",
      description: message,
    },
    {
      type: "danger",
      showIcon: true,
    }
  );
}

export function toastSuccess(message) {
  createToast(
    {
      title: "Sucesso",
      description: message,
    },
    {
      type: "success",
      showIcon: true,
    }
  );
}
