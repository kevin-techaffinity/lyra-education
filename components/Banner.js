import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Router from 'next/router';

import useCompleted from '../hooks/useCompleted';
import useModules from '../hooks/useModules';
import useService from '../hooks/useService';
import useSubscribed from '../hooks/useSubscribed';
import styles from '../styles/components/Banner.module.sass';

import Grid from './Grid';
import Image from './Image';
import SignupButton from './SignupButton';

export default function Banner() {
  const [active, setActive] = useState(null);
  const [ready, setReady] = useState(null);
  const { modules } = useModules();
  const { completionStatus } = useCompleted();
  const { service } = useService();
  const { subscriptionStatus } = useSubscribed();

  const { assets, metadata, callToAction, campaign } = service;

  useEffect(() => {
    if (!modules) return;

    const activeModule = modules.find((item) => item.status === 'ACTIVE');
    const readyModule = modules.find((item) => item.status === 'READY');

    setActive(activeModule);
    setReady(readyModule);
  }, [modules]);

  if (!completionStatus) return null;
  if (!service) return null;

  const handleClick = (state) => {
    Router.push('/module/[module]', state.slug);
  };

  const button = () => {
    if (false && metadata.subscribe)
      return <SignupButton label={callToAction} campaign={campaign} />;

    if (completionStatus?.completedToday)
      return (
        <button className={styles.banner__status} onClick={() => handleClick(active)} type="button">
          <span>Review Course</span>
          <i className="icon">
            <FaArrowRight />
          </i>
        </button>
      );

    if (active)
      return (
        <button className={styles.banner__status} onClick={() => handleClick(active)} type="button">
          <span>Continue Course</span>
          <i className="icon">
            <FaArrowRight />
          </i>
        </button>
      );

    if (ready)
      return (
        <button className={styles.banner__status} onClick={() => handleClick(ready)} type="button">
          <span>Start Course</span>
          <i className="icon">
            <FaArrowRight />
          </i>
        </button>
      );

    return null;
  };

  return (
    <div className={styles.banner}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        publicId={assets.banner}
        priority
        className={styles.banner__image}
        alt={metadata.heading}
      />
      <Grid>
        <div className={styles.banner__content}>
          <h1 className='d-lg-block d-none' dangerouslySetInnerHTML={{ __html: metadata.heading }} />
          <h2 className='d-lg-block d-none' dangerouslySetInnerHTML={{ __html: metadata.description }} />
          <h5 className='d-lg-none d-block text-white' dangerouslySetInnerHTML={{ __html: metadata.heading }} />
          <p className='d-lg-none d-block text-white py-2' dangerouslySetInnerHTML={{ __html: metadata.description }} />
          {button()}
        </div>
      </Grid>
      <div className={styles.banner__overlay} />
    </div>
  );
}
