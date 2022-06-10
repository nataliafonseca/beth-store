export const toCpfString = (value) =>
  value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");

export const toCepString = (value) =>
  value.replace(/(\d{2})(\d{3})(\d{3})/g, "$1.$2-$3");

export const toPhoneString = (value) => {
  if (value.length === 10)
    return value.replace(/(\d{2})(\d{4})(\d{4})/g, "($1) $2-$3");
  return value.replace(/(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
};

export const toPriceString = (value) => {
  value = Number(value);
  if (!isNaN(value)) {
    return Number(value).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  } else {
    return "";
  }
};

export const numbersOnly = (value) => value.replace(/\D/g, "");

export const toValidPrice = (value) => parseInt(value.replace(/\D/g, "")) / 100;
