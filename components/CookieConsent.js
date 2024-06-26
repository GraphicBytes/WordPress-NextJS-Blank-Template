import React, { useEffect, useState } from "react";
import Link from "next/link";
import parse from "html-react-parser";
import styles from "../styles/CookieConsent.module.scss";

export default function CookieConsent({ data }) {
  const [consent, setConsent] = useState(1);

  useEffect(() => {
    const consentStatus = JSON.parse(
      window.localStorage.getItem("cookie-consent")
    );
    consentStatus !== 1 && setConsent(0);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cookie-consent", consent);
  }, [consent]);
 
  function acceptCookies() {
    setConsent(1);
  }

  return (
    consent !== 1 && (
      <div className={styles.cookieConsent}>
        <h2>Cookie Consent</h2>
        {parse(data.company_data.cookie_consent_text)}
        <button onClick={acceptCookies}>Accept all cookies</button>
        <Link href={parse(data.company_data.privacy_policy_page.url)}>
          <a>{parse(data.company_data.privacy_policy_page.title)}</a>
        </Link>
      </div>
    )
  );
}
