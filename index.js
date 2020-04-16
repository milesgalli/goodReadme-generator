const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const filter = [
  "username",
  "email",
  "title",
  "description",
  "contents",
  "isntallation",
  "usage",
  "licensing",
  "avatar_url",
];

function createReadme(answerObj) {
  let result = "";

  for (const key in answerObj) {
    if (!filter.includes(key)) {
      continue
    }
    let formattedKey = key.slice(0,1).toUpperCase() + key.slice(1) ; 
    console.log(formattedKey);
      result += formattedKey+ ":" + " " + answerObj[key] + "\n" + "\n";
    
  }
  return result;
}

inquirer
  .prompt([
    {
      name: "username",
      message: "What is your github user name ?",
    },
    {
      name: "email_address",
      message: "What is your email adress? ",
    },
    // {
    //   name: "title",
    //   message: "What is the title of your project? ",

    // },
    // {
    //     name: "Description ?",
    //     message: "What is the project description ? ",
    //   },

    //   {
    //     name: "Contents",
    //     message: " Table of contents for the assingment ? ",
    //   },

    //   {
    //     name: "installation",
    //     message: "Installation guide ? ",
    //   },

    //   {
    //     name: "Usage",
    //     message: "What is the usage of your application ",
    //   },

    //   {
    //     name: "licnese",
    //     message: "What is the licnese ",
    //   },

    //   {
    //     name: "Contributing",
    //     message: "Who else contributed to the assignment ? ",
    //   },

    //   {
    //     name: "Test",
    //     message: "What tests did you do for the application ? ",
    //   },
    //   {
    //     name: "questions",
    //     message: "Additonal thoughts or questions ",
    //   },

    // questions here
  ])

  .then(async (answer) => {
    //call api

    //console.log(answer.username);

    // need to change

    let response = await axios.get(`https://api.github.com/users/${answer.username}`);

    let payload = createReadme(Object.assign(answer, response.data));

    fs.writeFileSync("readme.md", payload);
  })

  .catch((error) => {
    console.log(error);
    if (error.isTtyError) {
    } else {
    }
  });
