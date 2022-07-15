const traineeRoutes = (app, fs) => {

  const path = require("path");
  const dataPath = path.join(__dirname,"../modules","trainees.json");


  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
            throw err;
        }

        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

  
  app.get('/trainees', (req, res) => {
    try {
      const jsonData = fs.readFileSync(dataPath)
      res.status(200).json(JSON.parse(jsonData));
  } catch (error) {
      console.log("Error: "+error.message);
  }});

  // CREATE
app.post('/trainees', (req, res) => {
  readFile(data => {
   
    const newUserId = Date.now().toString();

    data[newUserId] = req.body;

    writeFile(JSON.stringify(data, null, 2), () => {
      res.status(200).send('new trainee added');
    });
  }, true);
});

 // UPDATE
 app.put('/trainees/:id', (req, res) => {

  readFile(data => {

      // add the new user
      const userId = req.params["id"];
      data[userId] = req.body;

      writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`trainee id:${userId} updated`);
      });
  },
      true);
});

    // DELETE
    app.delete('/trainees/:id', (req, res) => {

      readFile(data => {

          // delete the user
          const userId = req.params["id"];
          delete data[userId];

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`trainee id:${userId} removed`);
          });
      },
          true);
  });

  
};

module.exports = traineeRoutes;