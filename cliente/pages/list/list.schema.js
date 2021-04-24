import * as Yup from "yup";

export const schema = Yup.object().shape({
  account: Yup.string()
    .test(
      "maxDigits",
      "El numero de cuenta tiene 10 digitos",
      (number) => String(number).length === 10
    )
    .required("Requerido"),
});

export const INITIAL_VALUES = {
  fullname: "",
  amount: "",
};
