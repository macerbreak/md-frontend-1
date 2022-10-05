export const getCountryFlag = (countryCode: string) => {
  return `https://countryflagsapi.com/png/${countryCode?.toLowerCase()}`;
};
