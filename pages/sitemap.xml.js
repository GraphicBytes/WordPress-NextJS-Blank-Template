import getSitemap from "../helpers/getSitemap";

const Sitemap = () => {};

export async function getServerSideProps({ req, res }) {
 
  let currentDomain = req.headers.host
  let currentSlug = req.url
  const sitemapContent = await getSitemap(currentSlug, currentDomain);  
 
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemapContent);
  res.end();
  
  return {
    props: { sitemapContent },
  };
};

export default Sitemap;