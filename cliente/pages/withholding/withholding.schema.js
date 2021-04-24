import * as Yup from "yup";

export const schema = Yup.object().shape({
  account: Yup.string()
    .test(
      "maxDigits",
      "El numero de cuenta tiene 10 digitos",
      (number) => String(number).length === 10
    )
    .required("Requerido"),
  amount: Yup.number()
    .test(
      "maxDigits",
      "Debe ser minimo 10.000 y maximo 100.000.000",
      (number) => number >= 10000 && number <= 100000000
    )
    .required("Requerido"),
});

export const INITIAL_VALUES = {
  fullname: "",
  amount: "",
};
