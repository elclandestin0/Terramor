import web3 from './web3';
import LandmarkFactory from './artifacts/contracts/Landmark.sol/LandmarkFactory.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x91574A5a386a32f9Da2Af00082e5F0dE94feF9D9';
const abi = LandmarkFactory.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;