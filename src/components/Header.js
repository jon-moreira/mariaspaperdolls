import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import logoImage from "../assets/imgs/logo.svg";

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleResize = (event) => {
    // Force show menu
    if (document.documentElement.clientWidth >= 768) {
      // if (document.getElementsByClassName("main-menu")) {
        document
          .getElementsByClassName("main-menu")[0]
          .removeAttribute("style");
        setMenuOpen(false);
      // }
    }
  };

  useEffect(() => {
    const menuClick = (event) => {
      event.preventDefault();

      let target = document.getElementsByClassName("main-menu")[0];

      if (!menuOpen) {
        target.style.display = "block";
        target.style.height = target.scrollHeight + "px";
      } else {
        target.style.height = 0;
        target.style.display = "none";
      }

      setMenuOpen(!menuOpen);
    };

    document
      .getElementsByClassName("nav-switch")[0]
      //.removeEventListener("click", menuClick)
      .addEventListener("click", menuClick);
  }, [menuOpen]);

  useEffect(() => {
    // add active class to header link by current url
    document
      .querySelectorAll(
        'a[href^="/' + window.location.pathname.split("/")[1] + '"]'
      )[0]
      .classList.add("active");

    // Add event listener
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header-section sticky">
      <div className="container-fluid">
        <div className="d-flex justify-content-center justify-content-md-around">
          <div className="d-flex logo">
            <h2 className="site-logo">
              <Link to="/">
                <img src={logoImage} alt="Marias Paperdolls" />
              </Link>
            </h2>
          </div>
          <div className="d-flex">
            <nav className="main-menu">
              <ul>
                <li>
                  <Link to="/about-us">{t("menu.about")}</Link>
                </li>
                <li>
                  <Link to="/works">{t("menu.portfolio")}</Link>
                </li>
                {/* <li>
                  <Link to="/workshop">{t("menu.workshop")}</Link>
                </li> */}
                <li>
                  <Link to="/media">{t("menu.media")}</Link>
                </li>
                <li>
                  <Link to="/contact">{t("menu.contact")}</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="nav-switch">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </header>
  );
};

export default withRouter(Header);

// class Header extends Component {
//   constructor(props) {
//     super(props);

//     //this.handleScroll = this.handleScroll.bind(this);
//     this.handleResize = this.handleResize.bind(this);
//   }

//   componentDidMount() {
//     document
//       .getElementsByClassName("nav-switch")[0]
//       .addEventListener("click", (event) => {
//         event.preventDefault();
//         this.openned = !this.openned;
//         var target = document.getElementsByClassName("main-menu")[0];
//         if (this.openned) {
//           target.style.display = "block";
//           target.style.height = target.scrollHeight + "px";
//         } else {
//           target.style.height = 0;
//           target.style.display = "none";
//         }
//       });

//     //On resize window
//     window.addEventListener("resize", this.handleResize);

//     // When the user scrolls the page
//     //window.addEventListener("scroll", this.handleScroll);

//     // add active class to header link by current url
//     document
//       .querySelectorAll(
//         'a[href^="/' + window.location.pathname.split("/")[1] + '"]'
//       )[0]
//       .classList.add("active");
//   }

//   componentWillUnmount() {
//     // window.removeEventListener("scroll", this.handleScroll);
//     window.removeEventListener("resize", this.handleResize);
//   }

//   handleResize(event) {
//     // Force show menu
//     if (document.documentElement.clientWidth >= 768) {
//       //document.getElementsByClassName("main-menu")[0].removeAttribute("style");
//     }
//   }

//   handleScroll(event) {
//     let header = document.getElementsByTagName("header")[0];
//     // Get the offset position of the navbar
//     let sticky = header.offsetTop;

//     if (window.pageYOffset > sticky) {
//       header.classList.add("sticky");
//     } else {
//       header.classList.remove("sticky");
//     }
//   }

//   render() {
//     const { t } = this.props;

//     return (
//       <header className="header-section sticky">
//         <div className="container-fluid">
//           <div className="d-flex justify-content-center justify-content-md-around">
//             <div className="d-flex logo">
//               <h2 className="site-logo">
//                 <Link to="/">
//                   <img src={logoImage} alt="Marias Paperdolls" />
//                 </Link>
//               </h2>
//             </div>
//             <div className="d-flex">
//               <nav className="main-menu">
//                 <ul>
//                   <li>
//                     <Link to="/about-us">{t("menu.about")}</Link>
//                   </li>
//                   <li>
//                     <Link to="/works">{t("menu.portfolio")}</Link>
//                   </li>
//                   <li>
//                     <Link to="/workshop">{t("menu.workshop")}</Link>
//                   </li>
//                   <li>
//                     <Link to="/media">{t("menu.media")}</Link>
//                   </li>
//                   <li>
//                     <Link to="/contact">{t("menu.contact")}</Link>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//         <div className="nav-switch">
//           <FontAwesomeIcon icon={faBars} />
//         </div>
//       </header>
//     );
//   }
// }

// export default withTranslation() (withRouter(Header));
