const express = require("express");
const request = require("request");

const router = express.Router();
const JDOODLE_ENDPOINT = "https://api.jdoodle.com/execute";

router.post("/run", (req, res) => {
  try {
    const script = req.body.script;
    const language = req.body.lang;

    if (!script) {
      return res.status(500).json({
        message: "Please put some code",
      });
    }

    if (!language) {
      return res.status(500).json({
        message: "Please select a language",
      });
    }

    const runRequestBody = {
      script,
      language,
      versionIndex: req.body.versionIndex,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    };

    request
      .post({
        url: JDOODLE_ENDPOINT,
        json: runRequestBody,
      })
      .on("error", (error) => {
        console.log("request.post error", error);
        return res.status(400).send(error);
      })
      .on("data", (data) => {
        const parsedData = JSON.parse(data.toString());
        if (parsedData.error) {
          return res.status(400).send(parsedData);
        } else {
          return res.status(200).send({ runResult: parsedData });
        }
      });
  } catch (err) {
    return res.status(500).json({
      err,
      message: "Request failed",
    });
  }
});

module.exports = router;
