import React, {useEffect, useState} from 'react';
import {
  FaArrowRight,
  FaCheck,
  FaEye,
  FaHourglassHalf,
  FaLock,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegUserCircle,
} from 'react-icons/fa';
import { DateTime } from 'luxon';
import Router from 'next/router';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';

import useCompleted from '../hooks/useCompleted';
import styles from '../styles/components/Card.module.sass';

import Image from './Image';
import ScrollFade from './ScrollFade';
import { getMyProgress } from '../services/CourseSubscription';

export default function Card({ course }) {
  const [myProgress, setMyProgress] = useState([]);
  const { completionStatus } = useCompleted();
  const { slug, name, id, duration, author, updatedAt, caption, status, assets } = course;

  useEffect(() => {
    getMyProgress().then((data) => {
      setMyProgress(data?.response)
    });
  }, [])

  const button = () => {
    if (duration === 0) {
      return (
        <>
          <span>Coming Soon</span>
          <i className="icon">
            <FaHourglassHalf />
          </i>
        </>
      );
    }
    if (completionStatus?.completedToday && status === 'ACTIVE') {
      return (
        <>
          <span>Review</span>
          <i className="icon">
            <FaEye />
          </i>
        </>
      );
    }
    if (status === 'READY' || status == 'PENDING') {
      return (
        <>
          <span>{myProgress.some(obj => obj?.id == id) ? 'In Progress' : 'Start Now'}</span>
          <i className="icon">
            <FaArrowRight />
          </i>
        </>
      );
    }
    if (status === 'ACTIVE') {
      return (
        <>
          <span>Continue</span>
          <i className="icon">
            <FaArrowRight />
          </i>
        </>
      );
    }
    // if (status === 'PENDING') {
    //   return (
    //     <>
    //       <span>Module</span>
    //       <i className="icon">
    //         <FaLock />
    //       </i>
    //     </>
    //   );
    // }
    if (status === 'COMPLETED') {
      return (
        <>
          <span>Completed</span>
          <i className="icon">
            <FaCheck />
          </i>
        </>
      );
    }
    return null;
  };

  const className = () => {
    if (completionStatus?.completedToday && status === 'ACTIVE') {
      return styles.card__review;
    }
    if (status === 'READY') {
      return styles.card__current;
    }
    if (status === 'ACTIVE') {
      return styles.card__current;
    }
    if (status === 'PREVIEW') {
      return styles.card__preview;
    }
    if (status === 'COMPLETED') {
      return styles.card__completed;
    }
    return null;
  };

  const handleClick = () => {
    // if (!['READY', 'ACTIVE', 'COMPLETED'].includes(status)) return;
    Router.push('/module/[module]', slug);
  };

  const durationFormatted = () => `${duration} ${pluralize('day', duration)}`;
  const dateFormatted = () => {
    if (duration === 0) return 'Coming Soon';
    return `Last Updated: ${DateTime.fromISO(updatedAt, { zone: 'Africa/Johannesburg' }).toFormat(
      'L/y',
    )}`;
  };

  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  return (
    <ScrollFade>
      <div onClick={() => handleClick()} className={`${styles.card} ${className()}`}>
        <span className={styles.card__status}>{button()}</span>
        <Image
          width={240}
          height={200}
          objectFit="cover"
          publicId={assets.thumbnail}
          className={styles.card__image}
          alt={name}
        />
        <div className={styles.card__column}>
          <h3 className={styles.card__title}>{name}</h3>
          <span className={styles.card__details}>
            {duration !== 0 && (
              <span className={styles.card__detailsitem}>
                <i className="icon">
                  <FaRegClock />
                </i>
                {durationFormatted()}
              </span>
            )}
            <span className={styles.card__detailsitem}>
              <i className="icon">
                <FaRegUserCircle />
              </i>
              {`by ${author}`}
            </span>
            <span className={styles.card__detailsitem}>
              <i className="icon">
                <FaRegCalendarAlt />
              </i>
              {dateFormatted()}
            </span>
          </span>
          <span
            className={styles.card__description}
            dangerouslySetInnerHTML={{ __html: md.render(caption) }}
          />
        </div>
      </div>
    </ScrollFade>
  );
}
Card.propTypes = {
  course: PropTypes.shape({
    assets: PropTypes.shape({
      thumbnail: PropTypes.string,
    }).isRequired,
    status: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    slug: PropTypes.string,
    caption: PropTypes.string,
    author: PropTypes.string,
    updatedAt: PropTypes.string,
    duration: PropTypes.number,
  }).isRequired,
};
