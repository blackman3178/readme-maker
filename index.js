const ask = require("inquirer");
const fs = require("fs");

const generateREADME = (answers) => 
`# ${answers.title}

## Table of Contents 

### [- Description](##description)

### [- Installation](##installation)

### [- Usage](##usage)

### [- Liscense](##liscense)

### [- Contributing](##contributing)

### [- Tests](##tests)

### [- Questions](##questions)


## Description

### ${answers.description}

## Installation

### ${answers.installation}

## Usage 

### ${answers.usage}

## License 

### ${answers.license}

## Contributing

### ${answers.contributing}

## Tests

### ${answers.tests}

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
            choices: ["MIT", "Mozilla Public License", "Microsoft Public License", "Apache"]
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
    const fileName = title.toLowerCase().split(" ").join("");
    fs.writeFile(`${fileName}.md`, generateREADME(answers), (err) =>
    err ? console.log(err) : console.log(`Sucessfully created ${fileName}.md`)
    )
}

const innit = () => {
    propmtUser();
}

innit();