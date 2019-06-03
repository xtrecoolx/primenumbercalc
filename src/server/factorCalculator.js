module.exports = {
  isPrimeNumber(value) {
    for (let i1 = 2; i1 < value; i1 += 1) {
      for (let i2 = i1; i2 < value; i2 += 1) {
        const product = i1 * i2;
        if (product > value) break;
        if (product === value) return false;
      }
    }
    return true;
  },

  async detectCorrectFactors(userValue, factorsArray, tempArray) {
    const realFactorsArray = [];
    let isFoundProduct = false;
    let secondMultiplierArray = [];
    let productObjectArray = [];

    if (typeof tempArray === 'undefined') {
      secondMultiplierArray = factorsArray.slice();
    } else {
      productObjectArray = tempArray.slice();
      secondMultiplierArray = tempArray.slice();
    }

    for (let x = 0; x < factorsArray.length && !isFoundProduct; x += 1) {
      const firstNumber = factorsArray[x];
      for (let y = 0; y < secondMultiplierArray.length; y += 1) {
        const secondNumber = secondMultiplierArray[y];
        const product = firstNumber * secondNumber;

        if (product === userValue) {
          if (!realFactorsArray.includes(firstNumber)) realFactorsArray.push(firstNumber);
          if (!realFactorsArray.includes(secondNumber)) realFactorsArray.push(secondNumber);
          isFoundProduct = true;
        } else if (product < userValue) {
          if (!productObjectArray.includes(product)) productObjectArray.push(product);
        }
      }
    }

    if (isFoundProduct) {
      console.log(`Real factors are: ${realFactorsArray}`);
      return realFactorsArray;
    }
    return this.detectCorrectFactors(userValue, factorsArray, productObjectArray);
  },

  async generateFactors(userValue) {
    const factorsArray = [];
    for (let i = 2; i < userValue; i += 1) {
      const isPrime = this.isPrimeNumber(i);
      if (isPrime) {
        let multipliedValue = i;
        let multiplier = 1;
        while (multipliedValue < userValue) {
          multipliedValue = i;
          multipliedValue **= multiplier;
          if (multipliedValue < userValue) {
            // console.log(multipliedValue);
            factorsArray.push(multipliedValue);
            multiplier += 1;
          }
        }
      }
    }

    const userValueFactors = await this.detectCorrectFactors(userValue, factorsArray);
    const primeFactors = await this.checkUserValueFactorsForPrimes(userValueFactors, factorsArray);
    return primeFactors;
  },
  async checkUserValueFactorsForPrimes(userValueFactors, factorsArray) {
    let isPrimeFree = true;
    for (let x = 0; x < userValueFactors.length; x += 1) {
      if (!this.isPrimeNumber(userValueFactors[x])) {
        // eslint-disable-next-line no-await-in-loop
        const newPrimeFactors = await this.detectCorrectFactors(userValueFactors[x], factorsArray);
        userValueFactors.splice(x, 1);
        userValueFactors.push(newPrimeFactors[0]);
        userValueFactors.push(newPrimeFactors[1]);
        console.log(`Prime Factors: ${userValueFactors}`);
        isPrimeFree = false;
      }
    }
    if (!isPrimeFree) return this.checkUserValueFactorsForPrimes(userValueFactors, factorsArray);
    return userValueFactors;
  }
};
