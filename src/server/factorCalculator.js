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

  async detectCorrectPrimes(userValue, factorsArray, tempArray) {
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
        let secondNumber = secondMultiplierArray[y];
        if (typeof tempArray !== 'undefined') {
          secondNumber = secondMultiplierArray[y].result;
          console.log(`f:${firstNumber} s:${secondNumber} `);
        }
        const product = firstNumber * secondNumber;

        if (product === userValue) {
          if (!realFactorsArray.includes(firstNumber)) realFactorsArray.push(firstNumber);
          if (!realFactorsArray.includes(secondNumber)) realFactorsArray.push(secondNumber);
          isFoundProduct = true;
        } else if (product < userValue) {
          const productObj = { first: firstNumber, second: secondNumber, result: product };
          if (typeof tempArray !== 'undefined') {
            // eslint-disable-next-line max-len
            if (tempArray.find(o => o.result !== product)) {
              productObjectArray.push(productObj);
            }
          } else productObjectArray.push(productObj);
        }
      }
    }

    if (isFoundProduct) {
      console.log(`Factors are: ${realFactorsArray}`);
      return realFactorsArray;
    }
    return this.detectCorrectPrimes(userValue, factorsArray, productObjectArray);
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

    const primeFactors = await this.detectCorrectPrimes(userValue, factorsArray);
    return primeFactors;
  }
};
