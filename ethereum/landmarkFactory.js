import web3 from './web3';
import LandmarkFactory from './artifacts/contracts/Landmark.sol/LandmarkFactory.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x87B3380C013aEc02A2697C931DFCE96df68e0F62';
const abi = LandmarkFactory.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;