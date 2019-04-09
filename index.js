const request = require("request-promise");
const fs = require("fs");
const credentials = require("./credentials");

async function main() {
  try {
    const html = await request.post("https://accounts.craigslist.org/login", {
      form: {
        inputEmailHandle: credentials.email,
        inputPassword: credentials.pass
      },
      headers: {
        /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        Referer: "https://accounts.craigslist.org/login"
      },
      simple: false,
      followAllRedirects: true,
      jar: true
    });
    fs.writeFileSync("./login.html", html);
  } catch (error) {
    console.log(error);
  }
}

main();
