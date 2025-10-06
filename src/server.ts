/* eslint-disable no-console */
import { Server } from "http";
import config from "./config";
import app from "./app";





let server: Server;

// async function connectDB() {
//     try {
//         await prisma.$connect()
//         console.log("DB connection successfully!!")
//     } catch (error) {
//         console.log("DB connection failed!", error)
//         process.exit(1);
//     }
// }


const startServer = async () => {
    try {
        // await connectDB();
        server = app.listen(config.PORT, () => {
            console.log(`Server is running at: http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

(async () => {
    await startServer();
})();

// Handle Server Error Start =====================================================================
process.on("SIGINT", () => {
    console.log(`SIGINT receive. Server is shutting down... `);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.log(`SIGTERM receive. Server is shutting down... `);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    console.log(`Unhandled Rejection Error. Server is shutting down... `, error);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
});
process.on("uncaughtException", (error) => {
    console.log(`Uncaught Exception Error. Server is shutting down... `, error);
    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
});
// Handle Server Error End =======================================================================