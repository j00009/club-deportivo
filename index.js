const express = require('express')
const app = express()
const fs = require('fs/promises')
const { threadId } = require('worker_threads')

app.listen(3007, () => console.log("APP LISTEN IN PORT 3007"))

app.use(express.static("static"))
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile("index.html")
})

app.get("/deportes", (req, res) => {
  fs.readFile("data/deportes.json", "utf-8")
    .then(data => {
      const sports = JSON.parse(data)

      res.setHeader("status", 200).json(sports)
    })
})

app.get("/agregar", (req, res) => {
    try {
      const { nombre, precio } = req.query
  
      fs.readFile("./data/deportes.json", "utf-8")
        .then(data => {
          const sports = JSON.parse(data)
    
          sports.deportes.push({nombre, precio})
    
          fs.writeFile("./data/deportes.json", JSON.stringify(sports))
          .then(() => {
              res.json(sports)
            })
        })
    } catch (error) {
      console.error(error)
      
    }
  })
  
  
  app.get("/eliminar", (req, res) => {
    try {
        const { nombre, precio } = req.query
  
        fs.readFile("./data/deportes.json", "utf-8")
          .then(data => {
            const sportsJSON = JSON.parse(data)
      
            const filteredSports = sportsJSON.deportes.filter( s => s.nombre !== nombre)
      
            sportsJSON.deportes = filteredSports
      
            fs.writeFile("./data/deportes.json", JSON.stringify(sportsJSON))
            .then(
              res.json(sportsJSON)
              )
          })
    } catch (error) {
        console.error(error)
        
    }
  })
  
  app.get("/editar", (req, res) => {
    try {
        const { nombre, precio } = req.query
  
        fs.readFile("./data/deportes.json", "utf-8")
          .then(data => {
            const sportsJSON = JSON.parse(data)
      
            const modifiedSports = sportsJSON.deportes.map(s => {
              if (s.nombre == nombre) {
                s.precio = precio
                return s
              } else {
                return s
              }
            })
      
            sportsJSON.deportes = modifiedSports
      
            fs.writeFile("./data/deportes.json", JSON.stringify(sportsJSON))
              .then(() => {
                res.json(sportsJSON)
              })
          })
    } catch (error) {
        console.error(error)
        
    }
  })
