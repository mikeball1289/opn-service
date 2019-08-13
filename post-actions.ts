import { Router } from "express";
import { notify } from "./tray-controls";
import clipboardy = require('clipboardy');

const open = require('open');

export const actionRouter = Router();

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

actionRouter.post('/url', (req, res) => {
    if (req.body.url && typeof req.body.url === 'string' && URL_REGEX.test(req.body.url)) {
        open(req.body.url);
    }
    res.end('ok');
});

actionRouter.post('/paste', async (req, res) => {
    if (req.body.text && typeof req.body.text === 'string') {
        const clip: string = req.body.text;
        await clipboardy.write(clip);
        notify(`A new clip was copied\n${clip.length > 10 ? `${clip.substr(0, 30)}...` : clip}`);
    }
    res.end('ok');
});

actionRouter.post('/upload', (req, res) => {
    console.log(req.files);
    res.end('ok');
});