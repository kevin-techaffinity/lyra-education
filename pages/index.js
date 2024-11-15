import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';

import styles from '../styles/components/PageHeader.module.sass';

import Banner from '../components/Banner';
import CardContainer from '../components/CardContainer';
import GhostButton from '../components/GhostButton';
import Grid from '../components/Grid';
import Summary from '../components/Summary';
import Toast from '../components/Toast';
import useCompleted from '../hooks/useCompleted';
import useModules from '../hooks/useModules';
import useSubscribed from '../hooks/useSubscribed';
import { addOneDay } from '../utilities/date';
import { getAuthContent, signup } from '../services/User';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../components/Logo';
import { useDomainContext } from '../context/DomainContext';
import { getDomain } from '../utilities/getDomain';
import Img from '../components/Image';

const staticContent = {
  img: <Logo />,
  title: "Life Space",
  subtitle: "Welcome hereee to Life Space, You get all in one place",
  bannerTitle: "Reliable Software Advice",
  bannerDescription: "Thanks to Life Space, I was able to discover the perfect match and guidance that will help in aligning perfectly my life choices and know the requirements. Highly recommended!",
  bannerWritter: "Tod Cunningham",
  bannerWritterPosition: " Health Care Suppor",
}

const RenderContent = ({handleSubmit, show, content, flash, data, handleChange, formRef}) => {
  const [render, setRender] = useState(content)

  useEffect(() => {
    if (content == undefined) {
      setRender(staticContent)
    } else {
      setRender(content)
    }
  }, [content])

  return (
    <Modal id="login" show={show} size="xl" backdrop="static" keyboard={false} centered>
      <Modal.Body>
        <div className="modal-main-content login-modal">
          <div className="row">
            <div className="col-lg-6">
              <div className="login-descrp text-start">
                <svg
                  width="55"
                  height="37"
                  viewBox="0 0 55 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.2">
                    <path
                      d="M30.4557 25.0274C30.4557 17.6922 34.2844 5.04331 44.6351 0.104529C45.6072 -0.359147 46.2153 0.828604 45.4059 1.53529C38.3382 7.70666 35.9533 14.0995 42.3255 13.258C48.881 13.258 54.1955 18.5278 54.1955 25.0274C54.1955 31.527 48.881 36.7967 42.3255 36.7967C35.77 36.7967 30.4557 31.527 30.4557 25.0274Z"
                      fill="white"
                    />
                    <path
                      d="M0.780823 25.0274C0.780823 17.6922 4.60944 5.04331 14.9602 0.104529C15.9323 -0.359147 16.5404 0.828604 15.731 1.53529C8.6633 7.70666 6.27838 14.0995 12.6506 13.258C19.2061 13.258 24.5206 18.5278 24.5206 25.0274C24.5206 31.527 19.2061 36.7967 12.6506 36.7967C6.09502 36.7967 0.780823 31.527 0.780823 25.0274Z"
                      fill="white"
                    />
                  </g>
                </svg>
                <h4>{render?.bannerTitle}</h4>
                <p>{render?.bannerDescription}</p>
                <p className="author-name">
                  - {render?.bannerWritter}, <span>{render?.bannerWritterPosition}</span>
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-details text-start">
                <div className="login-logo">
                  <div className="logo-block text-left">
                    <a
                      className="logo-brand"
                      href="javascript:;"
                      title="MaxLife"
                    >
                      {render?.img ? render.img : <Img
                        width={50}
                        height={43}
                        objectFit="cover"
                        objectPosition="top"
                        publicId={render?.assets?.logo}
                        className={styles.pageHeader__image}
                        alt={'logo'}
                      />}
                    </a>
                  </div>
                </div>
                <div className="form-container">
                  <h4>{render?.subtitle}</h4>
                  <form
                    ref={formRef}
                    onSubmit={(event) => event.preventDefault()}
                    className="login-form"
                  >
                    {flash && (
                      <div className="flash text-center text-red">{flash}</div>
                    )}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Personal Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder="Your email address"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        placeholder="Your password"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm-password" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        name="confirm_password"
                        value={data.confirm_password}
                        placeholder="Confirm your password"
                        className="form-control"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-footer">
                      <a href="javascript:;" className="forgot-password">
                        Forgot Password?
                      </a>
                      <button
                        type="submit"
                        style={{ backgroundColor: "#001965" }}
                        className="btn btn-submit"
                        onClick={handleSubmit}
                      >
                        Get Started Here
                      </button>
                      <p className="login-text">
                        Already have an Account?{" "}
                        <Link href="/login" className="login-link primary-text">
                          Login
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default function Index({ allowPopup }) {
  const [show, setShow] = useState(true);
  const [flash, setFlash] = useState(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const formRef = useRef(null);
  const { modules } = useModules();
  const [limit, setLimit] = useState(10);
  const { completionStatus } = useCompleted();
  const { subscriptionStatus } = useSubscribed();

  const { clientDomain, setClientDomain } = useDomainContext();
  const [content, setContent] = useState();
  const populateAuthScreens = async () => {
    const data = await getAuthContent(clientDomain)

    setContent(data[0])
  }

  useEffect(() => {
    setClientDomain(getDomain())
  }, [])

  useEffect(() => {
    populateAuthScreens()
    allowPopup();
    setShow(!hasCookie('token'));
  }, [allowPopup]);

  useEffect(() => {
    if (!modules) return;
    if (completionStatus?.completedToday) return;
    if (!subscriptionStatus.subscribed) return;

    const allowToast = getCookie('course_reminder_toast');
    const activeCourse = modules.find((module) => module.status === 'ACTIVE');
    if (!activeCourse) return;

    if (!allowToast) {
      Toast({
        type: 'info',
        title: 'Reminder',
        message: `Don't forget to complete your <b>${activeCourse.name}</b> course!`,
        link: (
          <Link href={activeCourse.slug}>
            Continue
            <FaArrowRight />
          </Link>
        ),
      });
      setCookie('course_reminder_toast', true, { expires: addOneDay(new Date()) });
    }
  }, [completionStatus, subscriptionStatus, modules]);

  if (!modules) return null;

  const handleClick = () => {
    setLimit(1000);
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    const valid = formRef.current.reportValidity();
    if (!valid) return;

    const { payment_type, password, confirm_password, email } = data;

    if (password !== confirm_password) return setFlash('Password should match');
    try {
      setFlash(undefined);

      const payload = {
        username: email,
        password,
        email,
        paymentMethod: payment_type,
      };

      const { status, emailVerificationToken } = await signup(payload);

      if (status !== 201) {
        setFlash(message);
        return;
      }

      const response = await axios.post('/api/send', { token: emailVerificationToken });
      if (response.status == 200) {
        setFlash('Check email for verification');
        setData({ username: '', payment_type: '', email: '', password: '', confirm_password: '' });
        setDisabled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <RenderContent handleSubmit={handleSubmit} show={show} content={content} flash={flash} data={data} handleChange={handleChange} formRef={formRef} />
      <Banner />
      <Summary items={modules} />
      <Grid>
        <CardContainer items={modules.filter((o) => o.status !== 'COMPLETED').slice(0, limit)} />
        {modules.length >= limit && <GhostButton onClick={handleClick}>Browse more</GhostButton>}
      </Grid>
    </>
  );
}

Index.propTypes = {
  allowPopup: PropTypes.func.isRequired,
};
