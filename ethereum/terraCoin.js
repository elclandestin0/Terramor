import web3 from './web3';
import TerraCoin from './artifacts/contracts/Landmark.sol/TerraCoin.json';

// we need the contract address and abi to export our contract
// well. 
const contractAddress = '0x64A0f91138824927F12E158cdeDA57253C40A0b2';
const abi = TerraCoin.abi;

const instance = new web3.eth.Contract(abi, contractAddress);
export default instance;