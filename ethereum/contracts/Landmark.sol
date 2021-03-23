// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

// ERC20 Standard by OpenZeppelin
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/token/ERC20/ERC20.sol";

// Ownable standard by OpenZeppelin
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.0.0/contracts/access/Ownable.sol";

/// @title this contract is a factory to create other landmarks
/// @author Memo Khoury
/// @dev add stuff here later
contract LandmarkFactory {
    // [] that stores all the added landmarks
    Landmark[] public landmarks;

    function createLandmark(
        string memory _name,
        string memory _latLng,
        string memory _landmarkAddress,
        uint256 _tokenWorth
    ) public {
        // this is a unique salt that takes the current
        // block.timestamp to be added to the encoding
        // argument as a uniqueHash.
        uint256 _salt = block.timestamp;

        // uniqueHash that gets created from the object
        // variables that goes into creating this landmark
        // + the hash.
        bytes32 _uniqueHash =
            keccak256(
                abi.encodePacked(
                    _name,
                    _latLng,
                    _landmarkAddress,
                    _tokenWorth,
                    _salt
                )
            );
        Landmark landmark =
            new Landmark(
                _name,
                _latLng,
                _landmarkAddress,
                _tokenWorth,
                _salt,
                _uniqueHash,
                msg.sender
            );
        landmarks.push(landmark);
    }

    function getAllLandmarks() public view returns (Landmark[] memory) {
        return landmarks;
    }
}

/**
    @title Landmark
    @author Memo Khoury
    @dev the Landmark contract follows the OpenZeppelin Ownable standard.  
    A Landmark is created by the Factory owner and is passed down basic 
    values to identify it, such as the name, latLng and landmarkAddress. 
    Each Landmark has it's own tokenWorth (measured in TerraCoin). Harder 
    to find Landmarks are worth more TerraCoins!

    In addition to basic information to identify a Landmark, a Landmark 
    also has a salt (measured in the Block.timestamp at the moment of 
    creation) and a uniqueHash. Only the Landmark creator can return the 
    summary of the contract. The reason why we'd want the summary back is 
    to create the QR Code on the front-end of our application, which 
    attaches the name, latLng, landmarkAddress, toklenWorth, salt, 
    uniqueHash  and  the address of the respective Landmark contract.
    
    This ensures that when the  user scans the QRCode, it sends back the 
    information to this contract. The information is passed on to 
    scanLandmark() and is hashed by keccak256. After that, we compare the
    unioqueHash in this contract compared to the hash we just created after
    the user scans the landmark. If both hashes are equal, the Landmark is 
    verified and the user is transferred the respective amount of TerraCoins.
 */

contract Landmark {
    string name;
    string latLng;
    string landmarkAddress;
    uint256 public tokenWorth;
    uint256 public userIndex = 0;
    uint256 salt;
    bytes32 uniqueHash;
    mapping(uint256 => address payable) public usersDiscovered;
    address public manager;

    // emit when a landmark is scanned
    event LandmarkScanned(
        address _scanner,
        string _name,
        string _latLng,
        uint256 _tokenWorth
    );

    constructor(
        string memory _name,
        string memory _latLng,
        string memory _landmarkAddress,
        uint256 _tokenWorth,
        uint256 _salt,
        bytes32 _uniqueHash,
        address _creator
    ) {
        name = _name;
        latLng = _latLng;
        landmarkAddress = _landmarkAddress;
        tokenWorth = _tokenWorth;
        salt = _salt;
        uniqueHash = _uniqueHash;
        manager = _creator;
    }

    // this function is only used by the creator of this contract (the factory controller) and
    // it is explicitly used to create unique QR Codes.
    function returnSummary()
        public
        view
        isCreator
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            address
        )
    {
        return (name, latLng, landmarkAddress, tokenWorth, salt, address(this));
    }

    // when the user scans the QR code at a specific landmark, it returns the regular variables
    // of the landmark in addition to the unique salt. this, when it's hashed, will be compared
    // to the uniqueHash state of this contract.
    function scanLandmark(
        string memory _name,
        string memory _latLng,
        string memory _landmarkAddress,
        uint256 _tokenWorth,
        uint256 _salt
    ) public {
        bytes32 _hash =
            keccak256(
                abi.encodePacked(
                    _name,
                    _latLng,
                    _landmarkAddress,
                    _tokenWorth,
                    _salt
                )
            );
        require(_hash == uniqueHash);
        usersDiscovered[userIndex++] = msg.sender;
        // transfer money here (?)
        emit LandmarkScanned(msg.sender, name, latLng, tokenWorth);
    }

    modifier isCreator() {
        require(msg.sender == manager);
        _;
    }
}

/**
    @title TerraCoin
    @author Memo Khoury
    @dev TerraCoins are issued to users who find Landmarks after they scan a 
    respective QR Code of a Landmark!
 */
contract TerraCoin is ERC20 {

    constructor (string memory name, string memory symbol, uint supply) ERC20(name, symbol) {
        _mint(msg.sender, supply);
    }

    function transfer(address _recipient, uint256 amount)  
}
