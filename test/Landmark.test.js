const assert = require("assert");
// for our local test network
const ganache = require("ganache-cli");
const Web3 = require("web3");
const ganacheProvider = ganache.provider();
const web3 = new Web3(ganacheProvider);

const path = require("path");
const landmarkFactoryPath = path.resolve(
  __dirname,
  "..",
  "ethereum",
  "build",
  "LandmarkFactory.json"
);
const landmarkPath = path.resolve(
  __dirname,
  "..",
  "ethereum",
  "build",
  "Landmark.json"
);

// file stream reader to read the JSON paths of both the
// landmark factory and the landmark
const fs = require("fs");
const compiledFactory = fs.readFileSync(landmarkFactoryPath, "utf8");
const compiledLandmark = fs.readFileSync(landmarkPath, "utf8");

// accounts from ganache
let accounts;
let factory;
// campaign address after we create it from factory
let landmarkAddress;
let landmark;

// before we begin our tests, we need to deploy our landmark factory
// and our first landmark.
beforeEach(async () => {
  // get all ganache accounts
  accounts = await web3.eth.getAccounts();
  // creating the landmark factory to create other landmarks
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory).abi)
    .deploy({ data: JSON.parse(compiledFactory).evm.bytecode.object })
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
      gas: "1000000",
    });

  const landmarkAddresses = await factory.methods.getAllLandmarks().call();
  landmarkAddress = landmarkAddresses[0];

  landmark = await new web3.eth.Contract(
    JSON.parse(compiledLandmark).abi,
    landmarkAddress
  );
});
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
//   it("only owner can return summary of landamrk", async () => {
//     const summary = await landmark.methods
//       .returnSummary()
//       .call({ from: accounts[0] });
//     assert(summary["0"]);
//   });
  it("can scan a landmark", async () => {
    const summary = await landmark.methods
      .returnSummary()
      .call({ from: accounts[0] });
    await landmark.methods
      .scanLandmark(
        summary["0"],
        summary["1"],
        summary["2"],
        parseInt(summary["3"]),
        parseInt(summary["4"])
      )
      .send({ from: accounts[0] });
  });
});
