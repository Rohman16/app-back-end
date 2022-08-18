/* eslint-disable no-undef */
const myHapi = require("@hapi/hapi");
const { routes } = require("./routes");

const init = async () => {
  server = myHapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server sedang berjalan di ${server.info.uri}`);
};

init();
