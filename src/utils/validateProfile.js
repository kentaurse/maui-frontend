export const validateUserProfile = (profile) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    country,
    city,
    street,
    postalCode,
    phone
  } = profile;
  console.log(firstName)
  if(firstName && lastName && dateOfBirth && country && city && street && postalCode && phone) return true;
  return false;
}
