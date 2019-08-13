import { readFileSync } from "fs";
import { openDownloadDirectory } from "./download-manager";

const SysTray = require('systray').default;
const notifier = require('node-notifier');

interface ActionType {
    seq_id: number;
    type: string;
}

export function bindToSystemTray() {
    const systray = new SysTray({
        menu: {
            icon: readFileSync('./icon.b64', 'ascii'),
            title: "opn",
            tooltip: "opn",
            items: [{
                title: "View downloads",
                tooltip: "Open the configured download directory",
                checked: false,
                enabled: true
            }, {
                title: "Exit",
                tooltip: "Exit",
                checked: false,
                enabled: true
            }]
        },
        debug: false,
        copyDir: true, // copy go tray binary to outside directory, useful for packing tool like pkg.
    });
    
    systray.onClick((action: ActionType) => {
        if (action.seq_id === 0) {
            openDownloadDirectory();
        }
        if (action.seq_id === 1) {
            systray.kill()
        }
    });
}

export function notify(message: string) {
    notifier.notify({
        title: "opn",
        message
    });
}