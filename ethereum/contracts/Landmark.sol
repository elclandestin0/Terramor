// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ERC20 Standard by OpenZeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
    @title TerraCoin
    @author Memo Khoury
    @dev TerraCoins are issued to users who find Landmarks after 
    they scan a respective QR Code of a Landmark!
 */
contract TerraCoin is ERC20 {
    constructor() ERC20("TerraCoin", "TC") {
        _mint(msg.sender, 1000);
    }
}

/**
    @title this contract is a factory to create other landmarks
    @author Memo Khoury
    @dev The landmark factory takes the name, latitude + longitude,
    real world address and the token worth, which then creates the
    landmark. The salt is taken from the block.timestamp to add to 
    the uniqueness of each landmark. 
    
    Afterwards, the landmark data combined with the salt is hashed to
    create a unique hash, which finally creates the landmark. 
 */
contract LandmarkFactory {
    // [] that stores all the added landmarks
    Landmark[] private _deployedLandmarks;
    LandmarkInformation[] private _landmarks;
    address private _manager;

    constructor() {
        _manager = msg.sender;
    }

    struct LandmarkInformation {
        string _name;
        string _latLng;
        string _landmarkAddress;
        string _img;
        uint256 _tokenWorth;
    }

    // function to create a landmark. Only the owner can
    // create landmarks
    function createLandmark(
        string memory _name,
        string memory _latLng,
        string memory _landmarkAddress,
        string memory _img,
        uint256 _tokenWorth
    ) public isManager {
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
                    _img,
                    _tokenWorth,
                    _salt
                )
            );
        Landmark landmark =
            new Landmark(
                _name,
                _latLng,
                _landmarkAddress,
                _img,
                _tokenWorth,
                _salt,
                _uniqueHash,
                msg.sender
            );
        _deployedLandmarks.push(landmark);
        _landmarks.push(
            LandmarkInformation(_name, _latLng, _landmarkAddress, _img, _tokenWorth)
        );
    }

    function deployedLandmarks() public view returns (Landmark[] memory) {
        return _deployedLandmarks;
    }

    function landmarks() public view returns (LandmarkInformation[] memory) {
        return _landmarks;
    }

    modifier isManager() {
        require(msg.sender == _manager);
        _;
    }
}

/**
    @title Landmark
    @author Memo Khoury
    @dev the Landmark contract inherits from TerraCoin, which follows the
    OpenZeppelin ERC20 Standard.

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
contract Landmark is TerraCoin {
    string private _landmarkName;
    string private _latLng;
    string private _landmarkAddress;
    string private _img;

    // the worth of each landmark in TerraCoins
    uint256 private _tokenWorth;

    // the user index for usersDiscvoered
    uint256 private _userIndex = 0;

    // the unique salt and hash for each Landmark
    uint256 private _salt;
    bytes32 private _uniqueHash;

    // how many users discovered this landmark
    mapping(uint256 => address) private _usersDiscovered;
    address private _manager;

    // emit when a landmark is scanned
    event LandmarkScanned(
        address _scanner,
        string _name,
        string _latLng,
        uint256 _tokenWorth
    );

    constructor(
        string memory landmarkName_,
        string memory latLng_,
        string memory landmarkAddress_,
        string memory img_,
        uint256 tokenWorth_,
        uint256 salt_,
        bytes32 uniqueHash_,
        address creator_
    ) {
        _landmarkName = landmarkName_;
        _latLng = latLng_;
        _landmarkAddress = landmarkAddress_;
        _img = img_;
        _tokenWorth = tokenWorth_;
        _salt = salt_;
        _uniqueHash = uniqueHash_;
        _manager = creator_;
    }

    // All the getters. We don't include the hash the salt for both security
    // and User Experience reasons

    function landmarkName() public view returns (string memory) {
        return _landmarkName;
    }

    function latLng() public view returns (string memory) {
        return _latLng;
    }

    function landmarkAddress() public view returns (string memory) {
        return _landmarkAddress;
    }

    function img() public view returns (string memory) {
        return _img;
    }

    function tokenWorth() public view returns (uint256) {
        return _tokenWorth;
    }

    function usersDiscovered(uint256 userIndex_) public view returns (address) {
        return _usersDiscovered[userIndex_];
    }

    function manager() public view returns (address) {
        return _manager;
    }

    // this function is only used by the creator of this contract (the factory controller) and
    // it is explicitly used to create unique QR Codes.
    function returnSummary()
        public
        view
        isManager
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            uint256,
            address
        )
    {
        return (
            _landmarkName,
            _latLng,
            _landmarkAddress,
            _img,
            _tokenWorth,
            _salt,
            address(this)
        );
    }

    // when the user scans the QR code at a specific landmark, it returns the regular variables
    // of the landmark in addition to the unique salt. this, when it's hashed, will be compared
    // to the uniqueHash state of this contract.
    function scanLandmark(
        string memory landmarkName_,
        string memory latLng_,
        string memory landmarkAddress_,
        string memory img_,
        uint256 tokenWorth_,
        uint256 salt_
    ) public {
        bytes32 uniqueHash =
            keccak256(
                abi.encodePacked(
                    landmarkName_,
                    latLng_,
                    landmarkAddress_,
                    img_,
                    tokenWorth_,
                    salt_
                )
            );
        require(uniqueHash == _uniqueHash);
        _usersDiscovered[_userIndex++] = msg.sender;
        emit LandmarkScanned(msg.sender, landmarkName_, latLng_, tokenWorth_);
    }

    // check if the sender is the manager
    modifier isManager() {
        require(msg.sender == _manager);
        _;
    }
}
