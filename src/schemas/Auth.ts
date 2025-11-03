import * as yup from "yup";

export const SignUpSchema = yup
  .object({
    name: yup
      .string()
      .min(2, "O nome deve ter duas letras no mínimo")
      .required("O Nome é obrigatório"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("O E-mail é obrigatório"),
    password: yup
      .string()
      .min(6, "A palavra-passe deve ter 6 dígitos no mínimo")
      .required("A palavra-passe é obrigatório"),
    phone: yup
      .string()
      .length(9, "O telefone deve ter apenas 9 dígitos")
      .required("O Telefone é obrigatório"),
  })
  .required();

export type SignUpType = yup.InferType<typeof SignUpSchema>;

export const SignInSchema = yup
  .object({
    phone: yup
      .string()
      .transform((value) => value.replace(/\D/g, "")) // remove tudo que não é número
      .length(9, "O telefone deve ter apenas 9 dígitos")
      .required("O Telefone é obrigatório"),
    password: yup
      .string()
      .min(6, "A palavra-passe deve ter 6 dígitos no mínimo")
      .required("A palavra-passe é obrigatório"),
  })
  .required();

export type SignInType = yup.InferType<typeof SignInSchema>;
