import React, { useState, useEffect } from 'react';
import { Remarkable } from 'remarkable';

import CardContainer from '../components/CardContainer';
import Grid from '../components/Grid';
import StaticHeader from '../components/headers/StaticHeader';
import Hero from '../components/Hero';
import useModules from '../hooks/useModules';
import useService from '../hooks/useService';
import { getMyProgress } from '../services/CourseSubscription';
import { autologout } from '../services/User';
import { displayProgress } from '../utilities/showCourseStatus';
import { useAuth } from '../hooks/useAuth';
import { useDomainContext } from '../context/DomainContext';

export default function Progress() {
  useAuth();

  const [myProgress, setMyProgress] = useState([]);
  const { modules } = useModules();
  const { service } = useService();
  const {clientDomain} = useDomainContext()

  const { assets } = service;

  if (!modules) return null;
  if (!service) return null;

  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  useEffect(() => {
    getMyProgress().then((data) => {
      setMyProgress(data?.response)
    });
  }, [])

  const {data} = displayProgress(myProgress, modules)

  const handleLogout = () => {
    autologout();

    window.location = '/';
  }

  return (
    <>
      {assets && <Hero banner={assets.banner} />}
      <Grid>
        <StaticHeader title="Your Progress">
          View or review your completed course material below:
        </StaticHeader>
        {data.length > 0 ? <CardContainer items={data} /> : <h6 className='text-center'>No Progress so Far !</h6>}
      </Grid>
      <div className='d-flex w-100 justify-content-center mt-5'>
       <button onClick={handleLogout} className='border-0 px-5 rounded-pill text-white py-2 bg-danger'>Sign Out</button>
      </div>
    </>
  );
}
