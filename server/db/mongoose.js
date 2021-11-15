const mongoose = require('mongoose')

const username = process.env.MONGO_DB_USERNAME
const password = process.env.MONGO_DB_PASSWORD
S
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.5wirq.mongodb.net/getOrganized?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})