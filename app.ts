import { join } from 'path';
import { actionRouter } from './post-actions';
import { bindToSystemTray, notify } from './tray-controls';
import express from 'express';
import { createServer } from 'http';
import { ensureDownloadDirectory } from './download-manager';
import bodyParser = require('body-parser');
import fileUpload = require('express-fileupload');

ensureDownloadDirectory();
bindToSystemTray();

const app = express();
app.use(bodyParser.json());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.static('./public'));
app.use('/actions', actionRouter);
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public/404.html'));
})

createServer(app).listen(8080, () => notify('opn is running'));