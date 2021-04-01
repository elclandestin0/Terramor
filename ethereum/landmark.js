import web3 from './web3';
import Landmark from './artifacts/contracts/Landmark.sol/Landmark.json';

// Landmark constructor
export default (address) => {
    const abi = Landmark.abi;
    return new web3.eth.Contract(abi, address);
}