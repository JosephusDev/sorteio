import * as yup from "yup";
export const ProfileSchema = yup
  .object({
    name: yup
      .string()
      .min(2, "O nome deve ter duas letras no mínimo")
      .trim()
      .required("O Nome é obrigatório"),
    address: yup
      .string()
      .min(4, "O endereço deve ter quatro letras no mínimo")
      .trim()
      .required("O Endereço é obrigatório"),
    phone: yup
      .string()
      .transform((value) => value.replace(/\D/g, "")) // remove tudo que não é número
      .length(9, "O telefone deve ter apenas 9 dígitos")
      .required("O Telefone é obrigatório"),
    birthdate: yup
      .string()
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "A data deve estar no formato DD/MM/AAAA",
      )
      .required("A data de nascimento é obrigatória"),
  })
  .required();

export type ProfileFormValues = yup.InferType<typeof ProfileSchema>;
