const fs = require("fs");

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

const expectedOutput = `My Todo-list


Overdue
[ ] Submit assignment ${yesterday}



Due Today
[x] Pay rent
[ ] Service Vehicle



Due Later
[ ] File taxes ${tomorrow}
[ ] Pay electric bill ${tomorrow}`;

const writeReport = (data) => {
  console.log(data);
  let reportFile = "./report.json";
  fs.writeFileSync(reportFile, JSON.stringify(data));
};

fs.readFile("./output.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  } else {
    let output = data
      .trim()
      .split("\n")
      .map((row) => row.trim())
      .join("\n");
    let passed = output === expectedOutput;

    let feedback = passed
      ? "Good work! It looks like you've completed all the required functions as per the specification and it prints the todo list as intended."
      : `Oops! It looks like you haven't completed all the required functions as per the specification. Please review the specification and try again.\n\n Expected output:\n\`\`\`\n${expectedOutput}\n\`\`\`\n\nActual output:\n\`\`\`\n${output}\n\`\`\`\n\nYou may use a diff checker tool like this one to compare the expected and actual output: https://www.diffchecker.com/`;

    writeReport({
      version: 0,
      grade: passed ? "accept" : "reject",
      status: passed ? "success" : "failure",
      feedback: feedback,
      report: feedback,
    });
  }
});
