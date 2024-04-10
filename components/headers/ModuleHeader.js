import React from 'react';
import { FaAngleLeft, FaInbox, FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { getCookie } from 'cookies-next';
import { DateTime } from 'luxon';
import Link from 'next/link';
import {useRouter} from 'next/router';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import useCompleted from '../../hooks/useCompleted';
import useService from '../../hooks/useService';
import useSubscribed from '../../hooks/useSubscribed';
import styles from '../../styles/components/ModuleHeader.module.sass';
import Image from '../Image';
import ScrollFade from '../ScrollFade';

export default function ModuleHeader({ slug, item }) {
  const { name, duration, author, updatedAt, status, assets } = item;
  const { completionStatus } = useCompleted();
  const { service } = useService();
  const { subscriptionStatus } = useSubscribed();
  const router = useRouter();

  const { metadata, callToAction, loginUrl, subscribeUrl } = service;
  const loggedIn = !!getCookie('token');

  if (!completionStatus) return null;
  if (!service) return null;

  const button = () => {
    if (completionStatus?.completedToday && status === 'ACTIVE') return 'Tomorrow';
    if (status === 'COMPLETED') return 'Completed';
    if (status === 'ACTIVE') {
      return 'Continue';
    }
    if (status === 'READY') {
      return 'Start now';
    }
    return '';
  };

  const buttonClass = () => {
    if (completionStatus?.completedToday && status === 'ACTIVE') return '';
    if (status === 'COMPLETED') return styles.moduleHeader__review;
    if (status === 'ACTIVE') return styles.moduleHeader__current;
    if (status === 'READY' || status === 'PENDING') return styles.moduleHeader__current;
    return '';
  };

  const durationPagination = () => <Link href="/">Home</Link>;

  const durationFormatted = () => `${duration} ${pluralize('day', parseInt(duration, 10))}`;
  const authorFormatted = () => `By ${author}`;
  const dateFormatted = () =>
    `Last Updated: ${DateTime.fromISO(updatedAt, { zone: 'Africa/Johannesburg' }).toFormat('L/y')}`;

  const handleClick = (event) => {
    event.preventDefault();

    if (!loggedIn) {
      window.location.href = loginUrl;
      return;
    }

    // if (!subscriptionStatus.subscribed.hasAccess && service.metadata.subscribe) {
    //   router.push('/billing/' + name)
    //   return;
    // }

    router.push(slug);
  };

  return (
    <ScrollFade>
      <div className={styles.moduleHeader}>
        {assets && (
          <Image
            width={200}
            height={160}
            objectFit="cover"
            objectPosition="center"
            publicId={assets.thumbnail}
            className={styles.moduleHeader__image}
            alt={name}
          />
        )}
        <div className={styles.moduleHeader__column}>
          <h3 className={styles.moduleHeader__title}>{name}</h3>
          {name && (
            <>
              <span className={styles.moduleHeader__details}>
                <span className={styles.moduleHeader__detailsitem}>
                  <i className="icon">
                    <FaInbox />
                  </i>
                  {durationFormatted()}
                </span>
                <span className={styles.moduleHeader__detailsitem}>
                  <i className="icon">
                    <FaUserCircle />
                  </i>
                  {authorFormatted()}
                </span>
                <span className={styles.moduleHeader__detailsitem}>
                  <i className="icon">
                    <FaRegCalendarAlt />
                  </i>
                  {dateFormatted()}
                </span>
              </span>
              <span className={styles.moduleHeader__detailsitem}>
                <i className="icon">
                  <FaAngleLeft />
                </i>
                {durationPagination()}
              </span>{' '}
            </>
          )}
        </div>

        {status === 'COMPLETED' ||
        completionStatus?.completedToday ? (
          ''
        ) : (
          <a onClick={handleClick} className={`${styles.moduleHeader__status} ${buttonClass()}`}>
            {button()}
          </a>
        )}

        {!subscriptionStatus.subscribed.hasAccess && metadata.subscribe && (
          <a onClick={handleClick} className={`${styles.moduleHeader__status} ${buttonClass()}`}>
            {callToAction}
          </a>
        )}
      </div>
    </ScrollFade>
  );
}

ModuleHeader.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.number,
    author: PropTypes.string,
    updatedAt: PropTypes.string,
    status: PropTypes.string,
    assets: PropTypes.shape({
      thumbnail: PropTypes.string,
    }),
  }).isRequired,
  slug: PropTypes.string.isRequired,
};
