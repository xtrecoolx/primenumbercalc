module.exports = {
  // This is basic function which detects if a given number is a prime number or not.
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
  // This is a recursive function which tries to detect two factors of a given user value.
  // If the user value is not detected, it calls itself by feeding itself with previous
  // products which are stored in tempArray. If user value is found, then it returns
  // two factors of that product. The returning two factors may/may not be prime numbers.
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
      if (!realFactorsArray[1]) realFactorsArray.push(realFactorsArray[0]);
      return realFactorsArray;
    }
    return this.detectCorrectFactors(userValue, factorsArray, productObjectArray);
  },
  // This is our main function, which is called by index.js when user clicks on submit.
  // First we generate the prime numbers from 2 to given user value.
  // Then we call detectCorrectFactors to find two factors.
  // If these two factors are not prime, then we try to find the real prime factors.
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
  // This function checks if the detected factors are prime numbers or not.
  // It is a recursive function which keeps checking for prime factors until it finds them.
  async checkUserValueFactorsForPrimes(userValueFactors, factorsArray) {
    let isPrimeFree = true;
    const newUserValueFactors = [];
    for (let x = 0; x < userValueFactors.length; x += 1) {
      if (!this.isPrimeNumber(userValueFactors[x])) {
        // eslint-disable-next-line no-await-in-loop
        const newPrimeFactors = await this.detectCorrectFactors(userValueFactors[x], factorsArray);
        newUserValueFactors.push(newPrimeFactors[0]);
        if (newPrimeFactors[1]) newUserValueFactors.push(newPrimeFactors[1]);
        else newUserValueFactors.push(newPrimeFactors[0]);
        console.log(`Prime Factors: ${newUserValueFactors}`);
        isPrimeFree = false;
      } else {
        newUserValueFactors.push(userValueFactors[x]);
      }
    }
    if (!isPrimeFree) return this.checkUserValueFactorsForPrimes(newUserValueFactors, factorsArray);
    return userValueFactors;
  }
};
