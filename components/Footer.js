import Link from "next/link";
import parse from "html-react-parser";

export default function Footer({ data }) {
  let CurrentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-6"> 
            <Link
              href={parse(data.company_data.privacy_policy_page.url)}
              prefetch={false}
            >
              <a>{parse(data.company_data.privacy_policy_page.title)}</a>
            </Link>
            &nbsp;&#x2022;&nbsp;
            <Link 
              href={parse(data.company_data.terms_conditions_page.url)}
              prefetch={false}
            >
              <a>{parse(data.company_data.terms_conditions_page.title)}</a>
            </Link>
            <p>
              <a
                href={`mailto:${parse(data.company_data.main_email)}`}
                target="blank"
              >
                {parse(data.company_data.main_email)}
              </a>
            </p>
          </div>

          <div className="col-6">
            <p>{parse(data.company_data.company_address)}</p>
            <p>{parse(data.company_data.main_phone_number)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {" "}
            <p>Copyright {CurrentYear} &copy; Bright Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
