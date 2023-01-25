import express from "express";
import serveIndex from "serve-index";
import path from "path";
import shopFileBuilder from "./shop-file-builder.js";
import { nspFullDirPath, appPort } from "./envs.js";
import { afterStartFunction } from "./afterStartFunction.js";

const expressApp = express();
// Serve static files and interface

expressApp.use(shopFileBuilder);

expressApp.use(express.static(path.join(nspFullDirPath)));
expressApp.use(
  serveIndex(nspFullDirPath, {
    icons: true,
    hidden: true,
    // should ignore games folders only showing index files
    // to avoid bug with not listing when have many games
    filter: (filename, index, files) => {
      return filename.includes("shop");
    },
  })
);
const server = expressApp.listen(appPort, afterStartFunction(appPort));

export default server;
