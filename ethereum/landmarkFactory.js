import web3 from './web3';
import LandmarkFactory from './artifacts/contracts/Landmark.sol/LandmarkFactory.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0xe790C45A3B269fD7aD82e6BE81D08D3aE514ffB6';
const abi = LandmarkFactory.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;