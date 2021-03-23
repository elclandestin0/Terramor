/**
 * Write the compile script to compile only once
 */
const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Step 1. find build path and delete it
const build = path.resolve(__dirname, "build");
fs.removeSync(build);

// Step 2. Read the Landmark.sol script
const landmarkPath = path.resolve(__dirname, "contracts", "Landmark.sol");
const source = fs.readFileSync(landmarkPath, "utf8");

// Step 3. Compile both contracts (note: this is how solc
// compiles since ^0.5.0)
const input = {
  language: "Solidity",
  sources: {
    "Landmark.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
const contracts = output["contracts"]["Landmark.sol"];

// Step 4. create a new build directory
fs.ensureDirSync(build);

// // Step 5. write the output of both contracts into the build
for (let contract in contracts) {
  fs.outputJsonSync(
    path.resolve(build, contract + ".json"),
    contracts[contract]
  );
}
