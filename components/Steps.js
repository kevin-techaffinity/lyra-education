import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Link from 'next/link'

import styles from '../styles/components/Steps.module.sass';

export default function Steps({ page }) {
  const { progress, moduleSlug, chapter } = page;
  if (!progress) return null;
  const { previous, next, nextName, previousName } = progress.find((obj) => obj.current);

  return (
    <div className={styles.steps}>
      <Link
        className={`${styles.steps__item} ${styles.steps__previous}`}
        href={`/module/${moduleSlug}/${previous || ''}`}
      >
        {previous && (
          <i className="icon">
            <FaAngleLeft />
          </i>
        )}
        <div className={styles.steps__content}>
          {previous ? 'Back' : 'Overview'}
          <label className={styles.steps__label}>{previousName || chapter}</label>
        </div>
      </Link>
      <Link
        className={`${styles.steps__item} ${styles.steps__next}`}
        href={`/module/${moduleSlug}/${next || ''}`}
      >
        <div className={`${styles.steps__right} ${styles.steps__content}`}>
          {next ? 'Next' : 'Completed'}
          <label className={styles.steps__label}>{nextName || chapter}</label>
        </div>
        {next && (
          <i className="icon">
            <FaAngleRight />
          </i>
        )}
      </Link>
    </div>
  );
}

Steps.propTypes = {
  page: PropTypes.shape({
    moduleSlug: PropTypes.string,
    chapter: PropTypes.string,
    progress: PropTypes.arrayOf(
      PropTypes.shape({
        nextName: PropTypes.string,
        next: PropTypes.string,
        current: PropTypes.bool,
        completed: PropTypes.bool,
      }),
    ),
  }).isRequired,
};
