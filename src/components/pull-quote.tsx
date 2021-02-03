import React from "react";

interface PullQuoteProps {
  children?: React.ReactNode;
}

const PullQuote = ({children}: PullQuoteProps) => {
  return (
    <figure>
      <blockquote className="pullquote">{children}</blockquote>
    </figure>
  );
};

export default PullQuote;
