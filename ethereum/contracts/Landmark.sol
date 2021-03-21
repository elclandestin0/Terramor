// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract LandmarkFactory {
    Landmark[] public addedLandmarks;

    function createLandmark(
        string memory _name,
        string memory _latLng,
        string memory _landmarkAddress,
        uint256 _tokenWorth
    ) public {
        uint256 _salt = block.timestamp;
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
                _uniqueHash
            );
        addedLandmarks.push(landmark);
    }

    function getAllLandmarks() public view returns (Landmark[] memory) {
        return addedLandmarks;
    }
}

contract Landmark {
    string name;
    string latLng;
    string landmarkAddress;
    uint256 public tokenWorth;
    uint256 public userIndex = 0;
    uint256 salt;
    bytes32 uniqueHash;
    mapping(uint256 => address payable) public usersDiscovered;
    address creator;

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
        uniqueHash = _uniqueHash;
        creator = msg.sender;
    }

    function returnSummary()
        public
        view
        isCreator
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            uint256
        )
    {
        return (name, latLng, landmarkAddress, tokenWorth, salt);
    }

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
        // transfer money here
        emit LandmarkScanned(msg.sender, name, latLng, tokenWorth);
    }

    modifier isCreator() {
        require(msg.sender == creator);
        _;
    }
}
