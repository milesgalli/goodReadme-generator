const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const filter = [
  "username",
  "email_address",
  "title",
  "avatar_url",
  "description",
  "contents",
  "installation",
  "usage",
  "license",
  "contribution",
  "test", 
  "questions", 
  "links",
];

function createReadme(answerObj) {
  let result = "";

  for (const key in answerObj) {
    if (!filter.includes(key)) {
      continue
    }
    let formattedKey = key.slice(0,1).toUpperCase() + key.slice(1) ; 
   // console.log(formattedKey);
      result += "##" + " "+ formattedKey+ ":" + " " + "\n" +  answerObj[key] + "\n" + "\n" ;
    
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
    {
      name: "title",
      message: "What is the title omf your project? ",

    },
    {
        name: "description",
        message: "What is the project description ? ",
      },

      {
        name: "contents",
        message: " What is the table of contents for the assingment ? ",
      },

      {
        name: "installation",
        message: " What is the installation guide ? ",
      },

      {
        name: "usage",
        message: "What is the usage of your application ? ",
      },

      {
        name: "license",
        message: "What type of license is it ? ",
      },

      {
        name: "contribution",
        message: "Who else contributed to the assignment ? ",
      },

      {
        name: "test",
        message: "What tests did you do for the application ? ",
      },
      {
        name: "questions",
        message: "Additonal thoughts or questions ? ",
      },
    {
          name: "links",
          message: "Any other additional links needed ?  ",
        }

    // questions here
  ])

  .then(async (answer) => {

    let response = await axios.get(`https://api.github.com/users/${answer.username}`);
    console.log(response);
    let payload = createReadme(Object.assign(answer, response.data));
    
    fs.writeFileSync("readme.md", payload);
  })

  .catch((error) => {
    console.log(error);
    if (error.isTtyError) {
    } else {
    }
  });
