import c from "clsx";
import Link from "next/link";
import React from "react";

import Assistant from "../images/icons/assistant.svg";
import Broadband from "../images/icons/broadband.svg";
import Cloud from "../images/icons/cloud.svg";
import ECommerce from "../images/icons/e-commerce.svg";
import Email from "../images/icons/email.svg";
import Messaging from "../images/icons/messaging.svg";
import Mobile from "../images/icons/mobile.svg";
import Prepaid from "../images/icons/prepaid.svg";
import Search from "../images/icons/search.svg";
import Social from "../images/icons/social.svg";
import Video from "../images/icons/video.svg";
import {ServiceKind} from "../types";

interface EvaluatedServiceProps {
  name: string;
  kind: ServiceKind;
}

export const mapIcon = (
  kind: ServiceKind,
  hasShadow = true,
  background = "beige",
) => {
  const className = c("mr-2", {
    "fill-beige": background === "beige",
    "fill-white": background === "white",
    "svg-shadow": hasShadow,
  });

  switch (kind) {
    case "broadband":
      return (
        <Broadband className={className} aria-label="Broadband service icon" />
      );
    case "cloud":
      return <Cloud className={className} aria-label="Cloud service icon" />;
    case "eCommerce":
      return (
        <ECommerce className={className} aria-label="eCommerce service icon" />
      );
    case "email":
      return <Email className={className} aria-label="Email service icon" />;
    case "messagingVoip":
      return (
        <Messaging
          className={className}
          aria-label="Messaging and VOIP service icon"
        />
      );
    case "mobile":
      return <Prepaid className={className} aria-label="Mobile service icon" />;
    case "mobileEcosystem":
      return (
        <Mobile
          className={className}
          aria-label="Mobile ecosystem service icon"
        />
      );
    case "pda":
      return <Assistant className={className} aria-label="PDA service icon" />;
    case "photoVideo":
      return (
        <Video
          className={className}
          aria-label="Photo and video service icon"
        />
      );
    case "search":
      return <Search className={className} aria-label="Search service icon" />;
    case "socialNetworkBlogs":
      return (
        <Social
          className={className}
          aria-label="Social network service icon"
        />
      );
    default:
      return "";
  }
};

const EvaluatedService = ({name, kind}: EvaluatedServiceProps) => {
  const icon = mapIcon(kind);

  return (
    <Link passHref href={`/explore-services?s=${kind}`}>
      <a className="flex items-center h-8">
        {icon} {name}
      </a>
    </Link>
  );
};

export default EvaluatedService;
