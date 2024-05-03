import React, { useState } from 'react';
import { FaAngleLeft, FaInbox, FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa';
import { getCookie } from 'cookies-next';
import { DateTime } from 'luxon';
import Link from 'next/link';
import {useRouter} from 'next/router';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';
import { IoClose } from "react-icons/io5";

import useCompleted from '../../hooks/useCompleted';
import useService from '../../hooks/useService';
import useSubscribed from '../../hooks/useSubscribed';
import styles from '../../styles/components/ModuleHeader.module.sass';
import Image from '../Image';
import ScrollFade from '../ScrollFade';
import { createSubscription, getSlots } from '../../services/CourseSubscription';

export default function ModuleHeader({ slug, item }) {
  const [show, setShow] = useState(false);
  const [remainingSlot, setRemainingSlot] = useState(0);
  const { name, duration, author, updatedAt, status, assets, id } = item;
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

    getSlots(id).then((data) => {
      setRemainingSlot(data?.remaingSlots)
      if(!data?.isCourseExists && data?.remaingSlots > 0) {
        setShow(true)
      } else {
        router.push(slug);
      }
    })
  };

  const approve = () => {
    setShow(false)
    createSubscription({plan_id: "", amount: "", moduleId: id, update: true}).then((data) => {
      
    }).catch((err) => toast(err))
    router.push(slug);
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <ScrollFade>
      <Modal show={show} size="lg" backdrop="static" keyboard={false} centered style={{borderRadius: 10}}>
        <Modal.Body className="px-4 py-4">
          <div className='mx-3'>
            <div onClick={() => handleClose()} className='w-100 d-flex justify-content-end mb-2' style={{cursor: 'pointer'}}>
              <small className='d-flex justify-content-center align-items-center rounded-circle' style={{backgroundColor: '#FCD9E3', width: 30, height: 30, color: '#F24271'}}><IoClose /></small>
            </div>
            <h5 className='font-weight-bold' style={{color: '#111827'}}>Remaining Slots</h5>
            <p className='mt-4' style={{color: '#6B6C6F', fontSize: '17px', lineHeight: 2}}>You now have <strong className='font-weight-bold' style={{color: '#111827'}}>{remainingSlot}</strong> remaining slots. Are you sure you want to take this course as your next? You can press on <strong>Got it</strong></p>
            <button onClick={() => approve()} className='btn px-4 py-2 font-weight-bold' style={{borderRadius: 8, backgroundColor: '#DBEAFE', color: '#2E4994'}}>Got it, Thanks</button>
          </div>
        </Modal.Body>
      </Modal>
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
