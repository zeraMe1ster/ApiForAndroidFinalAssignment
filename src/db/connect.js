let mongoose = require("mongoose");

const server = "cluster0-atkyy.mongodb.net";
const database = "test?retryWrites=true&w=majority";
const user = "JovialDB";
const password = "a6hpWBQHwJqvacfy";

mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
