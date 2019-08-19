interface ClipboardItem {
    types: string[];
    getType(type: string): Promise<Blob>;
}

interface Clipboard {
    read(): Promise<ClipboardItem[]>
}
