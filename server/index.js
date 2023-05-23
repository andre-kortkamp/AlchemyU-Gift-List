const express = require('express');
const verifyProof = require('../utils/verifyProof');
const Blob = require('node:buffer').Blob;

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'c3f7f8bef6769c83cf77f88176da0690b09a47b2bec7c70912687201492ae7dd';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { proof, name } = req.body;

  // find byte size of Merkle root
  const myBlob = new Blob([MERKLE_ROOT]);
  const byteSize = myBlob.size;
  console.log(`Size of ${MERKLE_ROOT} is ${byteSize} bytes`);

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});