import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import data from "../assets/data.json";

function Elements(props) {
  const { t } = useTranslation();

  const elements = () => {
    let elements = [];
    data[props.dataValue].forEach((element) => {
      let elementUrl = `/${props.baseUrl}/${element.name}`;
      elements.push(
        <div key={element.name} className="element col-6 col-md-4 col-lg-3">
          <Link
            to={elementUrl}
            className="item set-bg"
            setbg={`${process.env.PUBLIC_URL}/imgs/${props.baseUrl}/${element.name}/${element.highligthImage}`}
          >
            <div className="pi-inner">
              <h2>{t("elements.view-more")}</h2>
            </div>
          </Link>

          <div className="meta">
            <h2>{(t(`elements.${element.name}`) !== `elements.${element.name}`) ? t(`elements.${element.name}`) : t(`elements.${element.name}.title`)}</h2>
          </div>
        </div>
      );
    });

    return elements;
  };

  return elements();
}

export default Elements;

// class Elements extends Component {
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     dataValue: this.props.dataValue,
//   //     baseURL: this.props.baseUrl,
//   //   };
//   // }

//   // elements() {
//   //   const { t } = this.props;
//   //   let elements = [];
//   //   data[this.state.dataValue].forEach((element) => {
//   //     let elementUrl = `/${this.state.baseURL}/${element.name}`;
//   //     elements.push(
//   //       <div key={element.name} className="element col-sm-6 col-md-4 col-lg-3">
//   //         <Link
//   //           to={elementUrl}
//   //           className="item set-bg"
//   //           setbg={`${process.env.PUBLIC_URL}/imgs/${this.state.baseURL}/${element.name}/${element.highligthImage}`}
//   //         >
//   //           <div className="pi-inner">
//   //             <h2>{t("elements.view-more")}</h2>
//   //           </div>
//   //         </Link>

//   //         <div className="meta">
//   //           <h2>{t(`elements.${element.name}`)}</h2>
//   //         </div>
//   //       </div>
//   //     );
//   //   });

//   //   return elements;
//   // }

//   render() {
//     return this.elements();
//   }
// }
// export default withTranslation()(Elements);
