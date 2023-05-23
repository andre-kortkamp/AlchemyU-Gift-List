const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  // get the name inserted by the user
  const name = "Wanda Ratke";

  // create the merkle tree for the whole nice list
  const merkleTree = new MerkleTree(niceList);

  // find the proof that the name is in the list 
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof,
    name
  });

  console.log({ gift });
}

main();