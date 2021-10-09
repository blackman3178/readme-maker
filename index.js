const ask = require("inquirer");
const fs = require("fs");
const licenseMap = new Map;

//set values in licenseMap 
licenseMap.set("MIT", "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)");
licenseMap.set("Mozilla Public License", "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)");
licenseMap.set("Eclipse Public License 1.0", "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)" );
licenseMap.set("SIL Open Font License 1.1","[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)");
licenseMap.set("IBM Public License 1.0", "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)");

const generateREADME = (answers, licenseBadge) => 
`# ${answers.title}
${licenseBadge}

## Table of Contents 

### [- Description](##description)

### [- Installation](##installation)

### [- Usage](##usage)

### [- Liscense](##liscense)

### [- Contributing](##contributing)

### [- Tests](##tests)

### [- Questions](##questions)


## Description

### -${answers.description}


## Installation

### -${answers.installation}


## Usage 

### -${answers.usage}


## License 

### -${answers.license}


## Contributing

### -${answers.contributing}


## Tests

### -${answers.tests}


## Questions

For questions, reach out to me via:

* Github: ${answers.github}

* Email: ${answers.email}
`;

const propmtUser = () => {
    ask.prompt([
        {
            type: "input",
            message: "What is the title of this project",
            name: "title"
        },
        {
            type: "input",
            message: "What is a brief description of the application?",
            name: "description"
        },
        {
            type: "input",
            message: "How should a user install this application?",
            name: "intructions"
        },
        {
            type: "input",
            message: "What is the usage information?",
            name: "usage"
        },
        {
            type: "list",
            message: "What is the license for this application?",
            name: "license",
            choices: ["MIT", "Mozilla Public License", "Eclipse Public License 1.0", "SIL Open Font License 1.1", "IBM Public License 1.0"]
        },
        {
            type: "input",
            message: "Who is contributing to this project?",
            name: "contributing",
        },
        {
            type: "input",
            message: "What kind of tests have been ran on this program",
            name: "tests"
        },
        {
            type: "input",
            message: "What is the link to your GitHub repo?",
            name:"github"
        },
        {
            type: "input",
            message: "What is my email?",
            name: "email"
        }
    ]).then ( (response) =>
        writeMD(response)
    )
}


const writeMD = (answers) => {
    console.log(answers);

    let {title, description, instructions, usage, license, contributing, tests, github, email} = answers;
    const licenseBadge = licenseMap.get(license);
    const fileName = title.toLowerCase().split(" ").join("");
    fs.writeFile(`${fileName}.md`, generateREADME(answers,licenseBadge), (err) =>
    err ? console.log(err) : console.log(`Sucessfully created ${fileName}.md`)
    )
}

const innit = () => {
    propmtUser();
}

innit();