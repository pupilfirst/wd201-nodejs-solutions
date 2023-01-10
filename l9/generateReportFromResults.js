let fs = require("fs");

let generateFeedback = (passed, results) => {
  const assertionResults = results["assertionResults"]
    .map((item) => {
      let status = item["status"];
      let title = item["title"];
      let statusSymbol = status == "passed" ? "✓" : "✗";
      return `${statusSymbol} ${title}`;
    })
    .join("\n\n");

  let errorMessage = results["message"];
  
  let prefixText = passed ? "" : "We tried to run the tests that you submitted and not all of them passed. Please ensure that the tests pass locally before submitting. Here is a snippet of your test results:";

  const feedback = prefixText + "\n\n" + assertionResults + "\n\n" + errorMessage;

  return feedback;
};

const writeReport = (data) => {
  console.log(data);
  let reportFile = "./report.json";
  fs.writeFileSync(reportFile, JSON.stringify(data));
};

const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return data;
  } catch (err) {
    console.log("File not found | Grading Skipped");
  }
};

readFile("results.json").then((data) => {
  if (data) {
    let results = JSON.parse(data);
    const passed = results["testResults"][0]["status"] == "passed";
    let feedback = generateFeedback(passed, results["testResults"][0]);
    writeReport({
      version: 0,
      grade: passed ? "skip" : "reject",
      status: passed ? "success" : "failure",
      feedback: feedback,
      report: feedback,
    });
  } else {
    writeReport({
      version: 0,
      grade: "skip",
      status: "failure",
      feedback:
        "We are unable to test your submission - something about it was too different from what we were expecting. Please check the instructions for this task and try again. If you have seen this message more than once, please reach out to Pupilfirst team for support.",
      report: "Unable to generate report due to missing results.json.",
    });
  }
});
