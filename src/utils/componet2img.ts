import html2canvas from 'html2canvas'
import { ReactNode } from 'react'

function dataURLtoBlob(dataurl:string) {
    const  arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

export const componentToImage = async(el:HTMLDivElement) =>{
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    return image;
}

export const downloadBlob = (blob:string,filename:string) =>{
    
const tempLink = window.document.createElement("a");
tempLink.style.display = "none";
tempLink.download = filename;

tempLink.href = blob;

document.body.appendChild(tempLink);
tempLink.click();
document.body.removeChild(tempLink);

tempLink.remove();
}

export const copy2clipboard = async (blob:string,type = 'image/png') =>{
    try {
        await navigator.clipboard.write([
            new ClipboardItem({
                'image/png': dataURLtoBlob(blob)
            })
        ]);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}