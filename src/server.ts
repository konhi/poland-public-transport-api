import errorHandler from "errorhandler";
import { initializeApp } from 'firebase/app';
import app from "./app";


/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

const firebaseConfig = {
    apiKey: "AIzaSyC2mEA1YiWoq5FfSQDkCMKFaiiGmIX7NKw",
    authDomain: "poland-public-transport.firebaseapp.com",
    projectId: "poland-public-transport",
    storageBucket: "poland-public-transport.appspot.com",
    messagingSenderId: "798136532541",
    appId: "1:798136532541:web:e2cfd635e18aa84c4ff454"
};

const firebaseApp = initializeApp(firebaseConfig);

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
