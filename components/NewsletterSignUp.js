import { useRef, useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import parse from "html-react-parser";
import styles from "../styles/NewsletterSignUp.module.scss";

export default function NewsletterSignUp({ data }) {
  const [form, setForm] = useState({
    csrf: false,
    session: false,
    emailError: null,
    termsError: null,
    formAlert: null,
    checkBox: false,
    loading: false,
    success: false,
  });

  const csrf = useRef();
  const session = useRef();
  const inputEmail = useRef();
  const terms = useRef();
  const apiURL = parse(data.company_data.form_api_url);
  const formID = parse(data.company_data.newsletter_form_id);

  function clearError(val) {
    setForm((prevState) => ({
      ...prevState,
      [val]: null,
      formAlert: null,
    }));
  }

  async function getTokens() {
    return axios
      .get(apiURL + "/get-token/" + formID + "/")
      .then((res) => {
        setForm((prevState) => ({
          ...prevState,
          csrf: res.data.message,
          session: res.data.session,
        }));
      })
      .catch((err) => {
        console.log(err);
        setForm((prevState) => ({
          ...prevState,
          formAlert: "Token error: " + err.message + ".",
          loading: false,
        }));
      });
  }

  useEffect(() => {
    getTokens();
  }, []);

  function submitForm() {
    setForm({ ...form, loading: true });
    const formData = new FormData();
    formData.append("csrf_token", csrf.current.value);
    formData.append("session", session.current.value);
    formData.append("email", inputEmail.current.value);
    formData.append("terms", terms.current.value);

    axios
      .post(apiURL + "/submit/" + formID + "/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        res.data && res.data.response === 1
          ? Object.keys(res.data.error_data).map((errMsg) => {
              if (errMsg && res.data.error_data[errMsg] === "INVALID EMAIL") {
                setForm((prevState) => ({
                  ...prevState,
                  [errMsg + "Error"]: "Invalid email address.",
                  loading: false,
                }));
              } else {
                setForm((prevState) => ({
                  ...prevState,
                  [errMsg + "Error"]: res.data.error_data[errMsg],
                  loading: false,
                }));
              }
            })
          : res.data && res.data.response === 2
          ? setForm((prevState) => ({
              ...prevState,
              success: true,
            }))
          : setForm((prevState) => ({
              ...prevState,
              formAlert: "Form error.",
              loading: false,
            }));
      })
      .catch((err) => {
        console.log(err);
        setForm((prevState) => ({
          ...prevState,
          formAlert: "Form error: " + err.message + ".",
          loading: false,
        }));
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitForm();
  }

  return (
    <section className={styles.newsLetter}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {!form.success ? (
              <form onSubmit={handleSubmit}>
                <h2 className={styles.newsLetterTitle}>Newsletter</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  ref={inputEmail}
                  onClick={(e) => clearError(e.currentTarget.name + "Error")}
                />

                {form.emailError && (
                  <div className={styles.formError}>*{form.emailError}</div>
                )}

                <div className={styles.checkbox}>
                  <label htmlFor="terms">
                    Sed ut perspiciatis{" "}
                    <Link
                      href={parse(data.company_data.privacy_policy_page.url)}
                      prefetch={false}
                    >
                      <a>
                        {parse(data.company_data.privacy_policy_page.title)}
                      </a>
                    </Link>{" "}
                    unde omnis iste natus error sit voluptatem accusantium
                    doloremque{" "}
                    <Link
                      href={parse(data.company_data.terms_conditions_page.url)}
                      prefetch={false}
                    >
                      <a>
                        {parse(data.company_data.terms_conditions_page.title)}
                      </a>
                    </Link>{" "}
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta
                    sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                    aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt.
                  </label>
                  <input 
                    id="terms"
                    type="checkbox"
                    name="terms"
                    ref={terms}
                    onChange={(e) => {
                      setForm((prevState) => ({
                        ...prevState,
                        checkBox: !prevState.checkBox,
                      }));
                      clearError(e.currentTarget.name + "Error");
                    }}
                    checked={form.checkBox}
                    value={form.checkBox ? "on" : "off"}
                  />
                  <div className={styles.inputHelper}></div>

                  {form.termsError && (
                    <div className={styles.formError}>*{form.termsError}</div>
                  )}
                </div>

                <button onClick={handleSubmit}>Sign Up</button>

                {form.formAlert && form.formAlert}
                {form.loading && <>LOADING</>}

                <input
                  ref={csrf}
                  type="hidden"
                  name="csrf_token"
                  value={
                    form.csrf
                      ? form.csrf
                      : "8WTdGYSMYuQ6AuHrOUuLA4O2lWE529LQm8RDLO67qI3FxDizkuLnccKHLVjYACgz"
                  }
                />
                <input
                  ref={session}
                  type="hidden"
                  name="session"
                  value={
                    form.session
                      ? form.session
                      : "wNpQr91lhsCmodBrIMG6Jo7h9FruDovQ6b3hfcNLtfARpjKeT66tAX5GdLqAk7bu"
                  }
                />
              </form>
            ) : (
              <p>Form Success</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
