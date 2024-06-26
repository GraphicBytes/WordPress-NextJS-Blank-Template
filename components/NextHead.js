import Head from "next/head";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import { getGlobal } from 'reactn';

export default function HeadTags({ pageData, companyData }) {
  const { asPath } = useRouter();
  const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin  : "";

  const currentURL = origin + asPath;
  const baseURL = origin;
  let baseApiURL = getGlobal().apiUrl
  baseApiURL = baseApiURL.slice(0, -1)
  return (
    <>  
      <Head>  
        <title>
          { (pageData.seo_title) && parse(pageData.seo_title) } | {" "}
          { (companyData.company_data.site_name) && parse(companyData.company_data.site_name)}
        </title>
        
        <meta name="description" content={ (pageData.seo_description) && parse(pageData.seo_description) } />
        <meta name="keywords" content={ (pageData.seo_keywords) && parse(pageData.seo_keywords) }/>
  
        {/* 
          <link rel="icon" href="/favicon.ico" /> 
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" /> 
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> 
          <link rel="manifest" href="/site.webmanifest" /> 
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#091925" />
          <link rel="shortcut icon" href="/favicon.ico" /> 
          <meta name="msapplication-TileColor" content="#091925" />
          <meta name="msapplication-config" content="/browserconfig.xml" /> 
          <meta name="theme-color" content="#091925" /> 
        */} 
 
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content={ (pageData.og_type) && parse(pageData.og_type)} />
        <meta property="og:title" content={ (pageData.og_title) && parse(pageData.og_title)}  />
        <meta property="og:description" content={ (pageData.og_description) && parse(pageData.og_description)} />
        <meta property="og:url" content={currentURL} /> 
        <meta property="og:site_name" content={ (companyData.company_data.site_name) && parse(companyData.company_data.site_name) } />
        <meta property="og:image" content={ (pageData.og_image) && baseApiURL+parse(pageData.og_image) }  />
        <meta property="og:image:secure_url" content={ (pageData.og_image) && baseApiURL+parse(pageData.og_image) } />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={baseURL} />
        <meta property="twitter:url" content={currentURL} /> 
        <meta name="twitter:title" content={ (pageData.og_title) && parse(pageData.og_title) }  />
        <meta name="twitter:description" content={ (pageData.og_description) && parse(pageData.og_description) } />
        <meta name="twitter:image" content={ (pageData.og_image) && parse(baseApiURL+ pageData.og_image) } />  
      </Head>
    </>
  );
}
