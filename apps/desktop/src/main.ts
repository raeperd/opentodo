import { NodeRuntime } from "@effect/platform-node";
import { app, BrowserWindow } from "electron";
import { Effect } from "effect";
import path from "node:path";
import { applicationName } from "./application.js";

const main = Effect.gen(function* () {
  app.setName(yield* applicationName);
  yield* Effect.promise(() => app.whenReady());
  yield* createWindow;

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) Effect.runFork(createWindow);
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});

NodeRuntime.runMain(main);

const createWindow = Effect.gen(function* () {
  const window = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 320,
    minHeight: 560,
    backgroundColor: "#111311",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  const developmentUrl = process.env.OPENTODO_WEB_URL;
  window.webContents.on("will-navigate", (event, url) => {
    const allowed = developmentUrl
      ? URL.parse(url)?.origin === URL.parse(developmentUrl)?.origin
      : url.startsWith("file:");
    if (!allowed) event.preventDefault();
  });
  yield* Effect.tryPromise({
    try: () =>
      developmentUrl
        ? window.loadURL(developmentUrl)
        : window.loadFile(path.resolve(import.meta.dirname, "../../web/dist/index.html")),
    catch: (cause) => new Error("Unable to load the OpenTodo interface", { cause }),
  });
});
