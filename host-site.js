const bodyParser = require('body-parser')
const child_process = require('child_process');
const express = require('express')

let SERVER = null

const stdout = function (data) {
    console.log(`${data.toString().trim()}`)
}

const stderr = function (data) {
    console.error(`stderr: ${data.toString().trim()}`)
}

const error = function (error) {
    console.error(`error: ${error.toString().trim()}`)
}

const startServer = function () {
    SERVER = child_process.spawn('./start-server.sh')
    SERVER.stdout.on("data", stdout)
    SERVER.stderr.on("data", stderr)
    SERVER.on("error", error)
}

const processUpdate = function (body) {
    console.log(`Update App request:${JSON.stringify(body)}`)
    if (SERVER) {
        // Need to kill the previous server process
        // detailed here: https://stackoverflow.com/a/56016815/1548429
        process.kill(-SERVER.pid)
    }
    startServer()
}

const startWebhookListener = function () {
    const app = express()
    const port = 55555
    app.use(bodyParser.json())

    app.post('/update', (request, response) => {
        processUpdate(request.body)
        response.status(200).end()
    })

    app.listen(port, () => {
        console.log(`Webhook listener running on port ${port}`)
    })
}

if (require.main === module) {
    startServer()
    startWebhookListener()
}
