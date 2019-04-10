const request = require("request-promise").defaults({ jar: true });
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
      followAllRedirects: true
    });
    fs.writeFileSync("./login.html", html);

    const billingHtml = await request.get(
      "https://accounts.craigslist.org/login/home?show_tab=billing"
    );
    fs.writeFileSync("./billing.html", billingHtml);
  } catch (error) {
    console.log(error);
  }
}

main();
