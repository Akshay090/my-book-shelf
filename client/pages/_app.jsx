import '@assets/styles/index.css';
import '@assets/styles/custom.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async appContext => {
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps
  };
};

export default MyApp;
