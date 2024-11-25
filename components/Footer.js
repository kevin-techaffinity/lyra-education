import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

import useService from '../hooks/useService';
import useSubscribed from '../hooks/useSubscribed';
import styles from '../styles/components/Footer.module.sass';

export default function Footer() {
  const { service } = useService();
  const { subscriptionStatus } = useSubscribed();

  const { metadata, loginUrl, unsubscribeUrl, subscribeUrl } = service;

  const loggedIn = !!getCookie('token');

  if (!service) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__column}>
          {true && metadata.subscribe ? (
            <a href={subscribeUrl}>
              <span dangerouslySetInnerHTML={{ __html: `Join ${metadata.title}` }} />
              <i className="icon">
                <FaAngleRight />
              </i>
            </a>
          ) : (
            <Link href="/progress">
              Your Progress
              <i className="icon">
                <FaAngleRight />
              </i>
            </Link>
          )}

          {!loggedIn && (
            <a href={loginUrl}>
              Login
              <i className="icon">
                <FaAngleRight />
              </i>
            </a>
          )}

          {/* {true && metadata.unsubscribe && (
            <a href={unsubscribeUrl}>
              <span dangerouslySetInnerHTML={{ __html: 'Unsubscribe' }} />
            </a>
          )}

          <Link href="/terms-and-conditions">
            Terms and Conditions
            <i className="icon">
              <FaAngleRight />
            </i>
          </Link> */}

          <div className={styles.footer__copy}>
            &copy; Copyright <b>{metadata.title}</b>. Product of <b>MaxLife</b>
            <sup style={{ fontSize: '12px', top: '-5px', position: 'relative' }}>&trade;</sup>
            <br />
            All rights reserved 2020.
          </div>
        </div>
      </div>
    </footer>
  );
}
