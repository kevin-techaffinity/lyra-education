import React, { useEffect, useState, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { getCookie, setCookie } from 'cookies-next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Form, Modal, Button } from 'react-bootstrap';

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
import { signup } from '../services/User';
import axios from 'axios';
import { hasCookie } from 'cookies-next';
import 'react-toastify/dist/ReactToastify.css';

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

  useEffect(() => {
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
      <Modal show={show} size="lg" backdrop="static" keyboard={false} centered>
        <Modal.Body className="pr-5 pb-4">
          {/* <p>Let's get you all set up, so you can start your journey here.</p> */}
          {flash && <div className="flash text-center text-red">{flash}</div>}
          <div className="row mt-2">
            <div className="col-lg-5">
              <div
                className="h-100 w-100 rounded py-5 d-flex flex-column justify-content-between align-items-center"
                style={{ backgroundColor: '#001965' }}
              >
                <div />
                <h6 className="text-white">Reliable Software Advice</h6>
                <p className="mx-4">
                  <small className="text-white text-sm">
                    “Thanks to Life Space, I was able to discover the perfect match and guidance
                    that will help in aligning perfectly my life choices and know the requirements.
                    Highly recommended!”
                  </small>
                </p>
                <div className="align-self-start ml-4">
                  <h6 className="text-white mb-0">
                    <small>Tod Cunningham</small>
                  </h6>
                  <small className="text-muted text-sm">Health Care Support</small>
                </div>
                <div />
              </div>
            </div>
            <div className="col-lg-7">
              <h4 className="text-center mb-4 primary-text mx-lg-5">
                Welcome to Life Space, You get all in one place
              </h4>
              <form ref={formRef} onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                  <label>
                    <small className="primary-text">Personal Email</small>
                  </label>
                  <input
                    type={'text'}
                    name="email"
                    value={data.email}
                    placeholder="Enter your Personal Email"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>
                      <small className="primary-text">Password</small>
                    </label>
                    <input
                      type={'password'}
                      name="password"
                      value={data.password}
                      placeholder="XXXXXXX"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>
                      <small className="primary-text">Re-type Password</small>
                    </label>
                    <input
                      type={'password'}
                      name="confirm_password"
                      value={data.confirm_password}
                      placeholder="XXXXXXX"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-3 ml-4" style={{ display: 'grid', gap: 5 }}>
                  <Button
                    style={{ backgroundColor: '#001965' }}
                    className="py-2 mx-5"
                    onClick={handleSubmit}
                  >
                    Get Started Here
                  </Button>
                  <Button variant="link">
                    <Link href="/login" className="primary-text">
                      Login
                    </Link>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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
