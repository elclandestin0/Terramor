import web3 from './web3';
import LandmarkFactory from './artifacts/contracts/Landmark.sol/LandmarkFactory.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x24b212174B4842C010831c455E884D8aF11a76F7';
const abi = LandmarkFactory.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;