"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgressBar = createProgressBar;
const cli_progress_1 = __importDefault(require("cli-progress"));
function createProgressBar() {
    return new cli_progress_1.default.SingleBar({
        format: 'Progress |{bar}| {percentage}% || {value}/{total} Items',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
    });
}
