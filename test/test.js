// const {time,loadFixture} =require("@nomicfoundation/hardhat-network-helpers");
// const {anyValue} =require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect}=require("chai");
const {ethers}=require('hardhat');

describe("Token contract", function() {
    it("Deployment should assign the total supply of tokens to the owner", async function() {
        // const [owner] = await ethers.getSigners();
        const [owner]=await ethers.getSigners();
        console.log("Signer object", owner);

        const Token = await ethers.getContractFactory("Token"); // Instantiate the contract
        const hardhatToken = await Token.deploy(); // Deploy the contract

        const ownerBalance = await hardhatToken.balanceOf(owner.address); // owner balance = 10000
        console.log("owner address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should transfer tokens between accounts", async function() {
        // const [owner] = await ethers.getSigners();
        const [owner,addr1,addr2]=await ethers.getSigners();
        // console.log("Signer object", owner);

        const Token = await ethers.getContractFactory("Token"); // Instantiate the contract
        const hardhatToken = await Token.deploy(); // Deploy the contract


        //transfer 10 token from owner to add1

        await hardhatToken.transfer(addr1.address,10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

        //transfer 5 tokens from addr1 to addr2
        await hardhatToken.connect(addr1).transfer(addr2.address,5);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
    });
});


