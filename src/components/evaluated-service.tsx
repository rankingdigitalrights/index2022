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

const mapIcon = (kind: ServiceKind) => {
  const className = "mr-2 svg-shadow";

  switch (kind) {
    case "broadband":
      return <Broadband className={className} />;
    case "cloud":
      return <Cloud className={className} />;
    case "eCommerce":
      return <ECommerce className={className} />;
    case "email":
      return <Email className={className} />;
    case "messagingVoip":
      return <Messaging className={className} />;
    case "mobile":
      return <Prepaid className={className} />;
    case "mobileEcosystem":
      return <Mobile className={className} />;
    case "pda":
      return <Assistant className={className} />;
    case "photoVideo":
      return <Video className={className} />;
    case "search":
      return <Search className={className} />;
    case "socialNetworkBlogs":
      return <Social className={className} />;
    default:
      return "";
  }
};

const EvaluatedService = ({name, kind}: EvaluatedServiceProps) => {
  const icon = mapIcon(kind);

  return (
    <span className="flex items-center h-8">
      {icon} {name}
    </span>
  );
};

export default EvaluatedService;
