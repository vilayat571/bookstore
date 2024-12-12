import React from "react";
import { Helmet } from "react-helmet-async";

interface ISEO {
  title: string;
  description: string;
  name: string;
  type: string;
  keywords:string
}

const SEO: React.FC<ISEO> = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywords} />
      <meta property="og:type" content={props.type} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:creator" content={props.name} />
      <meta name="twitter:card" content={props.type} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
    </Helmet>
  );
};

export default SEO;