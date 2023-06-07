// SPDX-License-Identifier: UNLICENSES
pragma solidity ^0.8.0;
import "../node_modules/hardhat/console.sol";

//we can debug the solidity contracts using hardhat library 
//and we can write the js code inside solidity smart contract 

contract Token{
    string public name="Hardhat Token";
    string public symbol="HHT";
    uint public totalSupply=10000;

    address public owner;

    mapping(address=>uint) balances;

    constructor(){
        balances[msg.sender]=totalSupply;
        owner=msg.sender;
    }

function transfer(address to,uint amount) external{

    //let's debug to check the balance 
    //** is just for ununique in test folder this  */
    console.log("**Sender balance is %s tokens**",balances[msg.sender]);
     console.log("**Sender is sending %s token to %s address**",amount,to);
    require(balances[msg.sender]>=amount,"Not enough token");
    balances[msg.sender]-=amount;
    balances[to]+=amount;
}

function balanceOf(address account) external view returns(uint256){
    return balances[account];
}
      
}

