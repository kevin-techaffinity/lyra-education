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

      if(data?.isCourseExists && data?.remaingSlots > 4) {
        createSubscription({plan_id: "", amount: "", moduleId: id, update: true}).then((data) => {

        }).catch((err) => toast(err))
        router.push(slug);
      }
      else if(!data?.isCourseExists && data?.remaingSlots > 4) {
        router.push(slug);
      }
      else if(!data?.isCourseExists && data?.remaingSlots > 0) {
        setShow(true)
      }
      else {
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
      <Modal show={show} size="md" id="remainingSlots2" backdrop="static" keyboard={false} centered style={{ borderRadius: 10 }}>
        <Modal.Body>
          <div>
            <div onClick={() => handleClose()} className="d-flex justify-content-end" style={{ cursor: 'pointer' }}>
              <small className="d-flex justify-content-center align-items-center rounded-circle btn-close" >
                <IoClose size={20} />
              </small>
            </div>
            <div className="modal-main-content">
              <svg
                width="91"
                height="92"
                viewBox="0 0 91 92"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M63.5 39H8.5H6.5V81.5L8.5 84.5H44L50 83.5H51.5V81.5L47.5 75L46 69.5L47.5 63.5L48.5 59L51.5 54L56.5 49L63.5 46.5V39Z"
                  fill="#17A2B8"
                  fill-opacity="0.24"
                />
                <path
                  d="M68.2125 90C66.6799 89.8989 13.8962 90.0119 10.4504 89.9783C8.08144 89.9757 5.81025 89.035 4.13514 87.3625C2.46002 85.6899 1.51779 83.4222 1.51518 81.0569V34.6637C1.47065 34.5031 1.54118 20.9349 1.51221 20.7746C1.51482 18.4101 2.45674 16.1432 4.13129 14.4712C5.80585 12.7993 8.07626 11.8589 10.4444 11.8564H18.4775V4.96416C18.4775 4.17802 18.7903 3.42407 19.347 2.86818C19.9037 2.31229 20.6588 2 21.4462 2C22.2335 2 22.9886 2.31229 23.5453 2.86818C24.102 3.42407 24.4148 4.17802 24.4148 4.96416V11.8564H33.5483V4.96416C33.5483 4.17802 33.8611 3.42407 34.4178 2.86818C34.9745 2.31229 35.7296 2 36.517 2C37.3043 2 38.0594 2.31229 38.6161 2.86818C39.1728 3.42407 39.4856 4.17802 39.4856 4.96416V11.8564H48.6177V4.96416C48.6177 4.17802 48.9304 3.42407 49.4872 2.86818C50.0439 2.31229 50.799 2 51.5863 2C52.3737 2 53.1287 2.31229 53.6855 2.86818C54.2422 3.42407 54.555 4.17802 54.555 4.96416V11.8564H62.1666C64.5348 11.8589 66.8054 12.7993 68.4802 14.4713C70.1549 16.1432 71.0971 18.4102 71.1 20.7749V47.2614C97.2623 51.6342 94.8332 89.0974 68.2125 90ZM64.9598 83.7098C67.0895 84.1537 69.2889 84.1463 71.4156 83.6882C73.5424 83.2302 75.5492 82.3315 77.3063 81.0505C79.0634 79.7694 80.5317 78.1344 81.6163 76.2512C82.7009 74.368 83.3776 72.2784 83.6027 70.1177C83.8278 67.957 83.5962 65.7731 82.923 63.7073C82.2498 61.6416 81.1499 59.7398 79.6944 58.1251C78.239 56.5104 76.4604 55.2186 74.4735 54.3333C72.4867 53.448 70.336 52.9889 68.1603 52.9856C49.6815 53.1604 46.9498 79.7743 64.9598 83.7098ZM7.45246 37.4961V81.0569C7.45351 81.8504 7.76966 82.6111 8.3316 83.1721C8.89353 83.7332 9.65538 84.0489 10.4501 84.0499H53.1997C40.49 72.1348 47.5081 49.3235 65.1627 47.2614V37.4961H7.45246ZM7.44949 31.5548H65.1627V20.7749C65.1616 19.982 64.8456 19.2218 64.2838 18.6612C63.7221 18.1006 62.9607 17.7854 62.1665 17.7848H54.5549V22.7404C54.5549 23.5266 54.2421 24.2805 53.6854 24.8364C53.1287 25.3923 52.3736 25.7046 51.5863 25.7046C50.7989 25.7046 50.0438 25.3923 49.4871 24.8364C48.9304 24.2805 48.6176 23.5266 48.6176 22.7404V17.7848H39.4857V22.7404C39.4857 23.5266 39.1729 24.2805 38.6162 24.8364C38.0594 25.3923 37.3043 25.7046 36.517 25.7046C35.7297 25.7046 34.9746 25.3923 34.4179 24.8364C33.8611 24.2805 33.5484 23.5266 33.5484 22.7404V17.7848H24.4148V22.7404C24.4148 23.5266 24.102 24.2805 23.5453 24.8364C22.9886 25.3923 22.2335 25.7046 21.4462 25.7046C20.6588 25.7046 19.9037 25.3923 19.347 24.8364C18.7903 24.2805 18.4775 23.5266 18.4775 22.7404V17.7848H10.4444C9.65041 17.7857 8.88922 18.101 8.32778 18.6616C7.76635 19.2221 7.45051 19.9822 7.44955 20.7749L7.44949 31.5548ZM38.739 76.4094H33.8383C33.0582 76.3984 32.3139 76.0813 31.7661 75.5266C31.2184 74.9719 30.9113 74.2242 30.9113 73.4453C30.9113 72.6663 31.2184 71.9187 31.7661 71.364C32.3139 70.8093 33.0582 70.4921 33.8383 70.4811H38.739C39.5191 70.4921 40.2635 70.8092 40.8112 71.3639C41.359 71.9186 41.666 72.6663 41.6661 73.4452C41.6661 74.2242 41.359 74.9718 40.8113 75.5266C40.2636 76.0813 39.519 76.3984 38.739 76.4094ZM22.0114 76.4094H17.1107C16.3306 76.3984 15.5862 76.0813 15.0385 75.5266C14.4908 74.9719 14.1837 74.2242 14.1837 73.4453C14.1837 72.6663 14.4908 71.9187 15.0385 71.364C15.5862 70.8093 16.3306 70.4921 17.1107 70.4811H22.0115C22.7916 70.4921 23.536 70.8093 24.0837 71.364C24.6314 71.9187 24.9385 72.6663 24.9385 73.4453C24.9385 74.2242 24.6314 74.9719 24.0837 75.5266C23.536 76.0813 22.7914 76.3984 22.0114 76.4094ZM74.5368 71.4827H68.1313C67.344 71.4826 66.5889 71.1703 66.0322 70.6144C65.4755 70.0586 65.1627 69.3046 65.1627 68.5185V60.7665C65.1737 59.9876 65.4913 59.2444 66.0469 58.6975C66.6024 58.1506 67.3512 57.844 68.1313 57.844C68.9115 57.844 69.6603 58.1506 70.2158 58.6975C70.7713 59.2444 71.0889 59.9876 71.1 60.7665V65.5544H74.5368C75.3169 65.5654 76.0612 65.8825 76.609 66.4372C77.1567 66.9919 77.4638 67.7396 77.4638 68.5185C77.4638 69.2975 77.1567 70.0451 76.609 70.5998C76.0612 71.1545 75.3169 71.4717 74.5368 71.4827ZM38.7392 63.7379H33.8383C33.0582 63.7269 32.3139 63.4098 31.7661 62.8551C31.2184 62.3004 30.9113 61.5527 30.9113 60.7738C30.9113 59.9948 31.2184 59.2471 31.7661 58.6924C32.3139 58.1377 33.0582 57.8206 33.8383 57.8096H38.739C39.5191 57.8206 40.2635 58.1377 40.8112 58.6924C41.359 59.2471 41.666 59.9947 41.6661 60.7737C41.6661 61.5527 41.359 62.3003 40.8113 62.855C40.2636 63.4097 39.5192 63.7269 38.7392 63.7379ZM22.0115 63.7379H17.1107C16.3306 63.7269 15.5862 63.4098 15.0385 62.8551C14.4908 62.3004 14.1837 61.5527 14.1837 60.7738C14.1837 59.9948 14.4908 59.2471 15.0385 58.6924C15.5862 58.1377 16.3306 57.8206 17.1107 57.8096H22.0114C22.7915 57.8206 23.5358 58.1377 24.0836 58.6924C24.6313 59.2471 24.9384 59.9947 24.9384 60.7737C24.9384 61.5526 24.6314 62.3003 24.0837 62.855C23.536 63.4097 22.7916 63.7269 22.0115 63.7379ZM38.7392 51.0664H33.8383C33.0582 51.0554 32.3139 50.7383 31.7661 50.1836C31.2184 49.6289 30.9113 48.8812 30.9113 48.1023C30.9113 47.3233 31.2184 46.5756 31.7661 46.0209C32.3139 45.4663 33.0582 45.1491 33.8383 45.1381H38.739C39.5191 45.1491 40.2635 45.4662 40.8112 46.0209C41.359 46.5756 41.666 47.3232 41.6661 48.1022C41.6661 48.8812 41.359 49.6288 40.8113 50.1835C40.2636 50.7382 39.5192 51.0554 38.7392 51.0664ZM22.0115 51.0664H17.1107C16.3306 51.0554 15.5862 50.7383 15.0385 50.1836C14.4908 49.6289 14.1837 48.8812 14.1837 48.1023C14.1837 47.3233 14.4908 46.5756 15.0385 46.0209C15.5862 45.4663 16.3306 45.1491 17.1107 45.1381H22.0115C22.7916 45.1491 23.536 45.4663 24.0837 46.0209C24.6314 46.5756 24.9385 47.3233 24.9385 48.1023C24.9385 48.8812 24.6314 49.6289 24.0837 50.1836C23.536 50.7383 22.7916 51.0554 22.0115 51.0664Z"
                  fill="#17A2B8"
                  stroke="white"
                  stroke-width="3"
                />
              </svg>
              <h4>Remaining Slots</h4>
              <p>
                You now have <strong className="font-weight-bold">{remainingSlot}</strong> remaining slots. Are you sure you want to take this course as your next? You can press on Got it
              </p>
            </div>
            <button onClick={() => approve()} className="btn btn-submit" style={{ paddingBottom : "12px" }} type="button">
              Got it, Thanks
            </button>
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
