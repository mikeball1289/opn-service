const OK_RESPONSE = 'ok';
async function post(path: string, data: any) {
    return new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) resolve(xhr.responseText);
        };
        xhr.onerror = (err) => reject(err);
        xhr.open('POST', `/actions/${path}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    });
}

const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
async function opnText(text: string) {
    const response = URL_REGEX.test(text) ? await post('url', { url: text }) : await post('paste', { text });
    if (response !== OK_RESPONSE) throw new Error(response);
}

async function opnImageFromClipboard() {
    const clipItems = await navigator.clipboard.read();
    // We only care about the first item in the clipboard, and its first encodable type
    const blobData = await clipItems[0].getType(clipItems[0].types[0]);
    (document.getElementById('imgDisplay') as HTMLImageElement).src = URL.createObjectURL(blobData);
}

async function opn() {
    try {
        const clip = await navigator.clipboard.readText();
        if (clip != undefined && clip != '') {
            // Text data
            await opnText(clip);
        } else {
            // Image data
            await opnImageFromClipboard();
        }
    } catch(err) {
        console.error("Something went wrong");
        console.error(err);
    }
}

function compat() {
    return navigator && navigator.clipboard && navigator.clipboard.read;
}

function main() {
    if (!compat()) {
        console.error('clipboard API isn\'t fully supported, try using the latest version of chrome');
        return;
    }
    const godButton = document.getElementById('god-button');
    if (godButton == undefined) {
        console.error('something has gone terribly wrong');
        return;
    }
    godButton.addEventListener('click', opn);
}

window.addEventListener('load', main);