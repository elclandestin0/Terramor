const assert = require("assert");
// for our local test network
const ganache = require("ganache-cli");
const Web3 = require("web3");
const ganacheProvider = ganache.provider();
const web3 = new Web3(ganacheProvider);

const path = require("path");
const landmarkPath = path.resolve(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "Landmark.sol",
  "Landmark.json"
);

const landmarkFactoryPath = path.resolve(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "Landmark.sol",
  "LandmarkFactory.json"
);

const terraCoinPath = path.resolve(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "Landmark.sol",
  "TerraCoin.json"
);

// file stream reader to read the JSON paths of both the
// landmark factory and the landmark
const fs = require("fs");
const compiledFactory = fs.readFileSync(landmarkFactoryPath, "utf8");
const compiledLandmark = fs.readFileSync(landmarkPath, "utf8");
const compiledTerraCoin = fs.readFileSync(terraCoinPath, "utf8");

// accounts from ganache
let accounts;
let factory;

// campaign address after we create it from factory
let landmarkAddress;
let landmark;

// terraCoin address
let terraCoin;

// before we begin our tests, we need to deploy our landmark factory
// and our first landmark.
beforeEach(async () => {
  // get all ganache accounts
  accounts = await web3.eth.getAccounts();
  // creating the landmark factory to create other landmarks
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory).abi)
    .deploy({ data: JSON.parse(compiledFactory).bytecode })
    .send({
      from: accounts[0],
      gas: "5555555",
    });

  await factory.methods
    .createLandmark(
      "Parc de la Fontaine",
      "[45.5271, -73.5695]",
      "3819 Avenue Calixa-Lavallée, Montréal, QC H2L 3A7",
      1
    )
    .send({
      from: accounts[0],
      gas: "5555555",
    });

  terraCoin = await new web3.eth.Contract(JSON.parse(compiledTerraCoin).abi)
    .deploy({ data: JSON.parse(compiledTerraCoin).bytecode })
    .send({
      from: accounts[0],
      gas: "5555555",
    });

  const landmarkAddresses = await factory.methods.getAllLandmarks().call();
  landmarkAddress = landmarkAddresses[0];

  landmark = await new web3.eth.Contract(
    JSON.parse(compiledLandmark).abi,
    landmarkAddress
  );
});

// BEGIN TESTS
describe("Landmark test", () => {
  it("deploys a factory", () => {
    assert.ok(factory.options.address);
  });
  it("adds a landmark", () => {
    assert.ok(landmark.options.address);
  });
  it("landmark owner is landmark creator", async () => {
    const manager = await landmark.methods.manager().call();
    assert.equal(manager, accounts[0]);
  });
  // it("only owner can return summary of landamrk", async () => {
  //   const summary = await landmark.methods
  //     .returnSummary()
  //     .call({ from: accounts[0] });
  //   assert(summary["0"]);
  // });
  it("deploys terraCoin and has 1000 token supply", async () => {
    const totalSupply = await terraCoin.methods.totalSupply().call();
    assert.equal(totalSupply, 1000);
    assert.ok(terraCoin.options.address);
  });
  it("check if owner's balance is 1000", async () => {
    const balance = await terraCoin.methods.balanceOf(accounts[0]).call();
    assert.equal(balance, 1000);
  });
  // it("can transfer 1 TC from owner to another account", async () => {
  //   await terraCoin.methods.transferFrom(accounts[0], accounts[1], 1).send({
  //     from: accounts[0],
  //     gas: "5555555",
  //   });
  // });
  // it("can scan a landmark", async () => {
  //   const summary = await landmark.methods
  //     .returnSummary()
  //     .call({ from: accounts[0] });

  //   await landmark.methods
  //     .scanLandmark(
  //       summary["0"],
  //       summary["1"],
  //       summary["2"],
  //       parseInt(summary["3"]),
  //       parseInt(summary["4"])
  //     )
  //     .send({ from: accounts[1], gas: "5555555"});

  //   // Total supply should now be totalSupply - _tokenWorth
  //   const totalSupply = await terraCoin.methods.totalSupply().call();
  //   console.log("Total supply is now: " + totalSupply);
  // });
});
