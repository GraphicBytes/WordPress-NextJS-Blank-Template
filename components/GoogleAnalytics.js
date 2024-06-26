import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import parse from "html-react-parser";

export default function GoogleAnalytics({ data }) {
  const gaCode = parse(data.company_data.ga_code);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", gaCode, { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, gaCode]); 

  return (
    <>
      <Script 
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaCode}`}
      />
      <Script
        id="ga-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaCode}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
