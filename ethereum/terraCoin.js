import web3 from './web3';
import TerraCoin from './artifacts/contracts/Landmark.sol/TerraCoin.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x97BBc66a2d8c973455AD2E6C80cA1F0D2236bE13';
const abi = TerraCoin.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;