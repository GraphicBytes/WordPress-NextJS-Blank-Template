import NextHead from "../components/NextHead";
import Header from "../components/Header";
import Page from "../components/Page";
// import Post from "../components/Post";
// import Archive from "../components/Archive";
import CookieConsent from "../components/CookieConsent";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Footer from "../components/Footer";  
import axios from "axios";  
import Search from "./search";


export default function Index({
  pageData,
  footerData,
  mainMenuData,
  companyData,
}) {
 
let typeRequest = pageData.type 
 
  return (
    <> 
      <NextHead pageData={pageData} companyData={companyData} />
      {/* <GoogleAnalytics data={companyData} />*/}
      <Header company={companyData} menu={mainMenuData}  /> 
 
      { (typeRequest === "page" || typeRequest === "single" || typeRequest === "archive") && ( 
        <Page data={pageData} />
      )} 
 
      {typeRequest == "search-page" && ( 
        <Search data={pageData} /> 
      )} 
      <CookieConsent data={footerData} /> 
      <Footer data={footerData} />
    </>
  );
}

export async function getStaticPaths() {

  const slugs = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/get/site-slugs").catch(function (error) {
    return null
  });;

 
  const paths = slugs.data.site_slugs.map(({ page }) => {
    return {
      params: {
        page,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  let slugStr = "";
  if (params.page) slugStr = params.page.toString().replace(/,/g, "/");

  let mainMenuData = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/get/main-menu").catch(function (error) {
    return null
  });

  let pageData = await axios.get(process.env.NEXT_PUBLIC_API_URL + slugStr).catch(function (error) {
    return null
  });

  let companyData = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/get/company").catch(function (error) {
    return null
  });

  let footerData = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/get/footer").catch(function (error) {
    return null
  });
  
  const result = 
  pageData.data["type"] === "404" ? {
    props: {},
    notFound: true,
  } : {
          props: {
            mainMenuData: mainMenuData.data,
            pageData: pageData.data,
            companyData: companyData.data,
            footerData: footerData.data,
           // breadcrumbs: breadcrumbs
          },
          revalidate: 60,
   };
  return result;
}
