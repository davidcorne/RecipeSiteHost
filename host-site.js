const child_process = require('child_process');

const stdout = function (data) {
    console.log(`stdout: ${data}`)
}

const stderr = function (data) {
    console.error(`stderr: ${data}`)
}

const error = function (error) {
    console.error(`error: ${error}`)
}

const setupProject = function (callback) {
    // child_process.execSync(`${changeDirectory} npm ci`, outputFunction)
    const options = {
        "cwd": "/home/pi/Development/RecipeSiteHost/RecipeSite"
    }
    const setup = child_process.spawn(`npm`, ["ci", "--omit=dev"], options)
    setup.stdout.on("data", stdout)
    setup.stderr.on("data", stderr)
    setup.on("error", error)
    setup.on("close", code => {
        if (code === 0) {
            callback()
        } else {
            console.error(`Exited with code ${code}`)
        }
    })
}

const startServer = function () {
    const server = child_process.spawn('./start-server.sh')
    server.stdout.on("data", stdout)
    server.stderr.on("data", stderr)
    server.on("error", error)
}

if (require.main === module) {
    startServer()
}
