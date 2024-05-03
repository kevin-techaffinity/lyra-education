import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Card.module.sass';

import Card from './Card';

export default function CardContainer({ items }) {
  return (
    <div className={styles.card__container}>
      {items && items.map((item, index) => (
        <Card key={index} course={item} index={index} />
      ))}
    </div>
  );
}

CardContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      assets: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }).isRequired,
      status: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
