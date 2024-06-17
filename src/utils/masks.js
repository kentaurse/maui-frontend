import createNumberMask from 'text-mask-addons/dist/createNumberMask';
export const maskCurrency = createNumberMask({
  prefix: '',
  allowDecimal: true,
  // integerLimit: 5,
});
export const unmaskCurrency = val => {
  if (!isNaN(val))
    return Number(val);
  return Number(val.replace(/[$, ]+/g, ''));
}

export const maskPhoneNumber = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
export const matchPhoneNumber = /^\(([1-9][0-9][0-9])\)\s[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/;

export const maskZipCodes = [/\d/, /\d/, /\d/, /\d/, /\d/];
export const matchZipCodes = /^\d{5}$/;

export const maskSSN1 = [/\d/, /\d/, /\d/];
export const matchSSN1 = /^\d{3}$/;
export const maskSSN2 = [/\d/, /\d/];
export const matchSSN2 = /^\d{2}$/;
export const maskSSN3 = [/\d/, /\d/, /\d/, /\d/];
export const matchSSN3 = /^\d{4}$/;
export const unmaskSSN = val => val.replace(/[_]+/g, '');