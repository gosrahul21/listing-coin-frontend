export default async function copyToClipboard(textToCopy: string, onSuccessCb: Function, onErrorCb: Function){
    try {
        await window.navigator.clipboard.writeText(textToCopy);
        onSuccessCb && onSuccessCb();
    } catch (error) {
        onErrorCb && onErrorCb();
    }
}