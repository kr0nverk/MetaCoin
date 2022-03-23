pragma solidity >=0.4.22 <0.9.0;

contract ContractMessage {
  address public owner = msg.sender;
  
  string public message;
  
  // deploy
  constructor() public {
    message = "Hello";
  }
  
  modifier ownerOnly() {
    require(
      msg.sender == owner,
      "This function is to the owner"
    );
    _;
  }

  function setMessage(string memory _message)
    public
    ownerOnly
    returns(string memory)
  {
    require(bytes(_message).length > 0);
    message = _message;
    return message;
  }
}
