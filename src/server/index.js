const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const factorCalculator = require('./factorCalculator');

const app = express();
app.use(bodyParser.json());
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/calculatePrimes', (req, res) => {
  const postBody = req.body;
  console.log(postBody.userValue);
  if (!postBody.userValue) {
    return res.send({ error: true, message: 'Please provide an input' });
  }

  const userValue = Number(postBody.userValue);
  if (userValue <= 0) {
    return res.send({ error: true, message: 'Please provide a valid number' });
  }

  factorCalculator.generateFactors(userValue).then(sum => res.send({ error: false, message: sum }));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
