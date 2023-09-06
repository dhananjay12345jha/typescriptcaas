// import * as report from "multiple-cucumber-html-reporter";

// let reporter = require('cucumber-html-reporter');

// //all the below meta data can be populated dynamically
// var options = {
//         theme: 'bootstrap',
//         jsonFile: 'output/results.json',
//         output: 'output/cucumber_report.html',
//         reportSuiteAsScenarios: true,
//         scenarioTimestamp: true,
//         launchReport: true,
//         metadata: {
//             "App Version":"0.3.2",
//             "Test Environment": "STAGING",
//             "Browser": "Chrome  54.0.2840.98",
//             "Platform": "Windows 10",
//             "Parallel": "Scenarios",
//             "Executed": "Remote"
//         }
//     };

// reporter.generate(options);

const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './target/',
	reportPath: './target/',
	metadata:{
        device: 'Local test machine',
        platform: {
            name: `${process.platform.toString()}`,
            // version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'POC'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
        ]
    }
});