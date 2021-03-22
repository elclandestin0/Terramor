// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

// this contract is a factory to create other landmarks 
contract LandmarkFactory {
    // [] that stores all the added landmarks 
    Landmark[] public addedLandmarks;

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
        
        // Create the new landmark
        Landmark landmark =
            new Landmark(
                _name,
                _latLng,
                _landmarkAddress,
                _tokenWorth,
                _salt,
                _uniqueHash
            );
        addedLandmarks.push(landmark);
    }

    function getAllLandmarks() public view returns (Landmark[] memory) {
        return addedLandmarks;
    }
}

// Landmark is a unique marker on the map with name, latLng, address, token worth
// and unique salt. 
contract Landmark {
    string name;
    string latLng;
    string landmarkAddress;
    uint256 public tokenWorth;
    uint256 public userIndex = 0;
    uint256 salt;
    bytes32 uniqueHash;
    mapping(uint256 => address payable) public usersDiscovered;
    address public creator;

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
        bytes32 _uniqueHash
    ) public {
        name = _name;
        latLng = _latLng;
        landmarkAddress = _landmarkAddress;
        tokenWorth = _tokenWorth;
        salt = _salt;
        uniqueHash = _uniqueHash;
        creator = msg.sender;
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
        require(msg.sender == creator);
        _;
    }
}
