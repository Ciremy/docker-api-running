const express = require("express");
const { stdout } = require("process");
var bodyParser = require("body-parser");
const app = express();
const port = 9078;

const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/server", (req, res) => {
//   res.send(serverList);
// });

app.get("/launch", (req, res) => {
  let response;
  const subProcess = require("child_process");
  subProcess.exec(
    `docker rm api --force
    docker rm $(docker ps --filter status=exited -q)
    docker build /gitea/git/repositories/feur/api.git -t api/node-web-app  
    docker run -p 8000:8000 --name api -d api/node-web-app`,

    (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        response = stdout;
        console.log(`The stdout Buffer from shell: ${stdout.toString()}`);
        console.log(`The stderr Buffer from shell: ${stderr.toString()}`);
      }
    }
  );
  res.send("working well");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
