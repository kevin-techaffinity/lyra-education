import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { Cloudinary } from '@cloudinary/url-gen';
import { Inter } from '@next/font/google';
import { setCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import PropTypes from 'prop-types';

import '../styles/styles.sass';

import '../styles/new_styles.css';

import IdlePopup from '../components/IdlePopup';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import WelcomePopup from '../components/WelcomePopup';
import useService from '../hooks/useService';
import useSubscribed from '../hooks/useSubscribed';
import { addOneYear } from '../utilities/date';
import { hasCookie } from 'cookies-next';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ModuleProvider } from '../context/ModuleContext';
import { DomainProvider } from '../context/DomainContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [allowPopup, setAllowPopup] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { service } = useService();
  const { subscriptionStatus } = useSubscribed();

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dzabdxdw5',
    },
  });

  useEffect(() => {
    if (router.query.welcome) {
      setShowWelcome(true);
    }
  }, [router.query]);

  // useEffect(() => {
  //   require('bootstrap/dist/js/bootstrap.bundle.js');
  // }, []);

  const login = (token) => {
    setCookie('token', token, { expires: addOneYear(new Date()) });
    const { hasAccess } = subscriptionStatus.subscribed || { hasAccess: true };
    if (hasAccess) {
      router.push('/?welcome=true');
      return;
    }
    router.push('/');
  };

  const hidePopup = () => {
    setAllowPopup(false);
    setShowWelcome(false);
  };

  if (!service) return null;
  if (!subscriptionStatus) return null;

  const { name, metadata, assets, domainName, primaryColor } = service;

  return (
    <HelmetProvider>
      <DomainProvider>
        <ModuleProvider>
          <Helmet>
            <script src="https://www.payfast.co.za/onsite/engine.js"></script>
          </Helmet>
          <Seo
            title={metadata.title && `${metadata.title} - ${metadata.heading}`}
            name={name}
            description={metadata.description}
            domainName={domainName}
            logo={cld.video(assets.logo).toURL()}
            primaryColor={primaryColor || 'transparent'}
            banner={assets.banner}
          />
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={inter.className}
            >
              <Layout>
                <GoogleAnalytics
                  gaMeasurementId={metadata.googleAnalytics}
                  trackPageViews
                  strategy="afterInteractive"
                />
                <Component {...pageProps} login={login} allowPopup={() => setAllowPopup(true)} />
                <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  draggable={false}
                  pauseOnVisibilityChange
                  pauseOnFocusLoss
                  closeOnClick
                  pauseOnHover
                />
              </Layout>
              {showWelcome ? (
                <WelcomePopup hide={hidePopup} />
              ) : (
                <IdlePopup allowPopup={allowPopup} hide={hidePopup} />
              )}
            </motion.div>
          </AnimatePresence>
        </ModuleProvider>
      </DomainProvider>
    </HelmetProvider>
  );
}

App.defaultProps = {
  pageProps: undefined,
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}),
};
