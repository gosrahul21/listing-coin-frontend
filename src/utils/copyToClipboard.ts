export default async function copyToClipboard(textToCopy: string, onSuccessCb: any, onErrorCb: any){
    try {
        await window.navigator.clipboard.writeText(textToCopy);
        onSuccessCb && onSuccessCb();
    } catch (error) {
        onErrorCb && onErrorCb();
    }
}