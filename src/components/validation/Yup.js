import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  name: Yup.string().required("İsim alanı zorunludur"),
  size: Yup.string().required("Lütfen hamur boyutunu seçiniz!"),
  extra: Yup.array().max(10, "En fazla 10 malzeme seçebilirsiniz"),
  dough: Yup.string().required("Lütfen hamur kalınlığını seçiniz!"),
  count: Yup.number().positive().required(),
  special: Yup.string(),
});
