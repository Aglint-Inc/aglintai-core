const { CloudTasksClient } = require("@google-cloud/tasks");

exports.enqueueTask = async (req, res) => {
  if (req.method !== "POST") {
    console.log(req.method);
    res.status(405).send("Method Not Allowed");
    return;
  }
  // Set the CORS headers to allow requests from specific origins.
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600"); // Cache preflight options for 1 hour.

  if (req.body.records) {
    const records = req.body.records;

    console.log(records.length, "records length");
    if (!Array.isArray(records)) {
      res.status(400).send("Invalid input: 'records' must be an array");
      return;
    }

    const project = "aglint-cloud-381414";
    const location = "us-central1";
    const queue = "lever-resume-sync";

    const tasksClient = new CloudTasksClient();
    const queuePath = tasksClient.queuePath(project, location, queue);
    const url = `https://preprod.aglinthq.com/api/lever/saveResume`;

    try {
      const responses = [];
      for (let i = 0; i < records.length; i++) {
        const payload = JSON.stringify(records[i]);
        const body = Buffer.from(payload).toString("base64");

        const task = {
          httpRequest: {
            httpMethod: "POST",
            url,
            headers: {
              "Content-Type": "application/json",
            },
            body,
          },
          scheduleTime: {
            seconds: Math.floor(Date.now() / 1000) + i,
          },
        };

        const [response] = await tasksClient.createTask({
          parent: queuePath,
          task,
        });
        console.log(`Task ${response.name} created`);
        responses.push(response.name);
      }
      res.status(200).send(`Tasks created: ${responses.join(", ")}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send("Invalid input: 'records' is missing");
  }
};
