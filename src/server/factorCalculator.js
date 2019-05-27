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

  detectCorrectPrimes(userValue, factorsArray) {
    const realFactorsArray = [];
    let isFoundProduct = false;

    console.log(`Factors: ${factorsArray}`);

    for (let x = 0; x < factorsArray.length && !isFoundProduct; x += 1) {
      const firstNumber = factorsArray[x];
      for (let y = 0; y < factorsArray.length; y += 1) {
        const secondNumber = factorsArray[y];
        const product = firstNumber * secondNumber;
        // console.log(`Product: ${product}`);

        if (product === userValue) {
          console.log(`x:${x} y:${y} `);
          realFactorsArray.push(firstNumber);
          realFactorsArray.push(secondNumber);
          isFoundProduct = true;
        }
      }
    }

    return realFactorsArray;
  },

  async generateFactors(userValue) {
    const factorsArray = [];

    for (let i = 2; i < userValue; i += 1) {
      const isPrime = this.isPrimeNumber(i);
      if (isPrime) {
        let multipliedValue = i;
        while (multipliedValue <= userValue) {
          factorsArray.push(multipliedValue);
          multipliedValue *= multipliedValue;
        }
      }
    }

    const primeFactors = this.detectCorrectPrimes(userValue, factorsArray);
    return primeFactors;
  }
};
