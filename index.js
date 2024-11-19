const app = require("./app");

app.listen(port, (err) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Yupp! Server is running on port ${port}`);
});
