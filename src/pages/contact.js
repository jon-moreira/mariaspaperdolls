import React, { useState } from "react";
import * as emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

function Contact () {
  const { t } = useTranslation();
  const [mailInfo,setMailInfo] = useState({
       mailSend: false,
       mailError: false,
     });

  const [emailData, setEmailData] = useState({ 
    name: "",
    email: "",
    subject: "",
    message: "",
    errors: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },});

    const handleInputChange = (event) => {
      event.preventDefault();
      const target = event.target;
      const name = target.name;
      const value = target.value;
        console.log(emailData);
        console.log(value);

     
        setEmailData(Object.assign(emailData, {[name]: value}))

      // setEmailData({
      //   ...emailData,
      //   [name]: value,
      // })

    }
    const validateForm = () => {
      let errors = {};
      let formatIsValid = true;
      
      const { name, email, subject, message } = emailData;
  
      if (name.trim() === "" || name.trim().length < 3) {
        errors.name = t("contact.invalid-name");
        formatIsValid = false;
      }
  
      if (subject.trim() === "" || subject.trim().length < 3) {
        errors.subject = t("contact.invalid-subject-format");
        formatIsValid = false;
      }
  
      if (email.trim() === "" || email.trim().length < 3) {
        errors.email = t("contact.invalid-email-format");
        formatIsValid = false;
      }
  
      if (message.trim() === "" || message.trim().length < 10) {
        errors.message = t("contact.invalid-message");
        formatIsValid = false;
      }
  
      let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  
      if (!pattern.test(email)) {
        errors.email = t("contact.invalid-email-format");
        formatIsValid = false;
      }
  
      setEmailData(Object.assign(emailData, errors))
      // setEmailData({
      //   ...emailData,
      //   errors,
      // })
      return formatIsValid;
    }

    const sendMessage = (event) => {
      event.preventDefault();
      if (!validateForm()) {
        return;
      }
  
      const { name, email, subject, message } = emailData;
  
      var templateParams = {
        from_email: email,
        from_name: name + " (" + email + ")",
        reply_to: email,
        from_subject: subject,
        message_html: message,
      };
  
      emailjs
        .send(
          "marias_paperdolls_gmail_com",
          "template_DlKiRTv1",
          templateParams,
          "user_FF9fTkX9b8yXq2Q0EOf7G"
        )
        .then(
          (response) => {
            setMailInfo({mailSend: true, mailError: false});
            // this.setState({
            //   mailSend: true,
            //   mailError: false,
            // });
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            setMailInfo({mailSend: false, mailError: true});
            // this.setState({
            //   mailSend: false,
            //   mailError: true,
            // });
            console.log(err);
          }
        );
    }
  
    const successMessage = () => {
      const { mailSend, mailError } = mailInfo;
  
      if (mailSend) {
        return (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-success" dangerouslySetInnerHTML={{ __html: t("contact.success-send-message") }}></div>
            </div>
          </div>
        );
      }
  
      if (mailError) {
        return (
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger" dangerouslySetInnerHTML={{ __html: t("contact.error-send-message") }} />
            </div>
          </div>
        );
      }
    }


    return (
      <section className="container contact">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 contect-tect">
            <h1>{t("contact.title")}</h1>
            <span
              dangerouslySetInnerHTML={{ __html: t("contact.description") }}
            />
          </div>
        </div>

        <form className="contact-form">
          <div className="row">
            <div className="col-md-6 mb-30">
              <div className="outline">
                <label htmlFor="name">{t("contact.name")}</label>
                <input
                  name="name"
                  required
                  type="text"
                  onChange={handleInputChange}
                />

                <label className="danger">{emailData.errors.name}</label>
              </div>
            </div>
            <div className="col-md-6 mb-30">
              <div className="outline">
                <label htmlFor="name">{t("contact.email")}</label>
                <input
                  name="email"
                  required
                  type="text"
                  onChange={handleInputChange}
                />

                <label className="danger">{emailData.errors.email}</label>
              </div>
            </div>
            <div className="col-md-12 mb-30">
              <div className="outline">
                <label htmlFor="subject">{t("contact.subject")}</label>
                <input
                  name="subject"
                  required
                  type="text"
                  onChange={handleInputChange}
                />

                <label className="danger">{emailData.errors.subject}</label>
              </div>
            </div>
            <div className="col-12 mb-30">
              <div className="outline">
                <label htmlFor="name">{t("contact.message")}</label>
                <textarea
                  name="message"
                  required
                  type="text"
                  onChange={handleInputChange}
                />

                <label className="danger">{emailData.errors.message}</label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button onClick={sendMessage} className="btn-submit">
              {t("contact.send")}
            </button>
          </div>
        </form>
        <br/>
        {successMessage()}
      </section>
    );

}

export default Contact;