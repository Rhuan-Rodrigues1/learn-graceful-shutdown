"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const processID = process.pid;
const server = http_1.default.createServer((req, res) => {
    for (let index = 0; index < 1e7; index++) {
        res.end("pid: " + processID);
    }
});
server.listen(3000, () => {
    console.log("Running in process: " + processID);
});
