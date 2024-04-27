export const copyToClipboard =async () =>{
    if(!window.location){
        return;
    }
    const URL = window.location.href;
    try {
        await navigator.clipboard.writeText(URL);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }

    
