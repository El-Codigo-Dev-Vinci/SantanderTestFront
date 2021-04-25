export function CalculateBeers(peopĺe, temp) {
  let numberOfBeerPerPerson = 1;

  if (temp > 24) {
    numberOfBeerPerPerson = 2;
  } else if (temp < 20) {
    numberOfBeerPerPerson = 0.75;
  }

  return Math.ceil((peopĺe * numberOfBeerPerPerson) / 6);
}
