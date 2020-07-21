const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const server = express()
const methodOverride = require('method-override')


server.set("view engine", "njk")

server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))
server.use(methodOverride("_method"))
server.use(routes)

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.listen(5000, function() {
    console.log("Server is Running")
})