// validationSchemas.js

import * as Yup from 'yup';

export const firmValidationSchema = Yup.object().shape({
  name: Yup.string().required('Firma adı zorunludur'),
  address: Yup.string().required('Adres zorunludur'),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Telefon numarası 10 haneli olmalıdır')
    .required('Telefon zorunludur'),
  taxNumber: Yup.string()
    .matches(/^[0-9]{3}$/, 'Vergi numarası 10 haneli olmalıdır')
    .required('Vergi numarası zorunludur'),
});
