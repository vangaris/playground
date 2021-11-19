const mongoose = require('mongoose')

const username = "admin"
const password = "1234"
const name = "getOrganized"

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.5wirq.mongodb.net/${name}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
)
