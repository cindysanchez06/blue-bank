import * as Yup from "yup";

export const schema = Yup.object().shape({
  fullname: Yup.string()
    .min("10", "Minimo 10 caracteres")
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
  amount: 0,
};
