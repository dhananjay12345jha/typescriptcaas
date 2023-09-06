// cucumber.js

let common = [
    'src/*/features/*.feature',                // Specify our feature files
   // '--require-module ts-node/register',    // Load TypeScript module
    '--require dist/*/step_definitions/*.js',   // Load step definitions
    '--require dist/support/utils/*.js',      // Load support utils
    '--format json:target/results.json',           //output to json file
    '--publish-quiet',

    // '--tags @focus'
].join(' ');

module.exports = {
    default: `${common} --world-parameters {"env":"dev"}`,
    integ: `${common} --world-parameters {"env":"integ"}`
};