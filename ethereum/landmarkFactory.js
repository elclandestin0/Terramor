import web3 from './web3';
import LandmarkFactory from './artifacts/contracts/Landmark.sol/LandmarkFactory.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x9a7f5012328a3AD652978D01391e5F943a37F42c';
const abi = LandmarkFactory.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;