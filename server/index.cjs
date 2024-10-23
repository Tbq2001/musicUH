import('./server.js')
  .then((module) => {
    console.log("Server started");
  })
  .catch((err) => {
    console.error("Failed to start the server", err);
  });
