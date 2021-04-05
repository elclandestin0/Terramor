import web3 from './web3';
import TerraCoin from './artifacts/contracts/Landmark.sol/TerraCoin.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0xF5281b1AD9fD1Fe16aE15D00a8c5d08d18889Eab';
const abi = TerraCoin.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;