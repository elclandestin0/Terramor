import web3 from './web3';
import TerraCoin from './artifacts/contracts/Landmark.sol/TerraCoin.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0xd71a2a5e29b39C55337085031f56A7640D6F1767';
const abi = TerraCoin.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;