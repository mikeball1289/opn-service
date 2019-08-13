import { existsSync, mkdirSync } from "fs";
import { homedir } from "os";
import { join } from "path";
import { exec } from "child_process";
import { notify } from "./tray-controls";

const DOWNLOAD_DIRECTORY = join(homedir(), 'opn', 'downloads');

export function ensureDownloadDirectory() {
    if (!existsSync(DOWNLOAD_DIRECTORY)) {
        mkdirSync(DOWNLOAD_DIRECTORY, { recursive: true });
    }
}

export function openDownloadDirectory() {
    exec(`start "" "${DOWNLOAD_DIRECTORY}"`, err => {
        if (err) {
            notify(`Failed to open download directory`);
            console.error(err);
        }
    });
}