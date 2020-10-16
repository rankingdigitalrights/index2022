import "../css/index.css";

import {AppProps} from "next/app";

const MyApp = ({Component, pageProps}: AppProps) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default MyApp;
