import axios from 'axios';

const getSitemap = async (currentSlug, currentDomain) => { 
    let urlSiteMap = process.env.API.slice(0, -1)+currentSlug 

    const response = await axios.get(urlSiteMap);

    let xmlString = response.data;
 
    //replace domain in the <loc> tag 
    let toFind = new RegExp('<loc>https://'+process.env.API_DOMAIN, "g") 
    let toReplace = "<loc>https://"+currentDomain
    let xmlStringFinal = xmlString.replace( toFind, toReplace); 
    
    //Remove tag style xml
    let xmlReplaceStyleTag = xmlStringFinal.replace("<?xml-stylesheet","<xml-stylesheet"); 
    let xmlStringNoStyle = xmlReplaceStyleTag.replace(/<xml-stylesheet[^>]*>/g,"");
    return xmlStringNoStyle; 
}; 

export default getSitemap;