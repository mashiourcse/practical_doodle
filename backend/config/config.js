require("dotenv").config();

const dev = {

    app: {
        port: process.env.PORT || 4000
    },
    db: {
        url: process.env.DB
    }
}

module.exports = dev;