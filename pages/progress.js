import React, { useState, useEffect } from 'react';
import { Remarkable } from 'remarkable';

import CardContainer from '../components/CardContainer';
import Grid from '../components/Grid';
import StaticHeader from '../components/headers/StaticHeader';
import Hero from '../components/Hero';
import useModules from '../hooks/useModules';
import useService from '../hooks/useService';
import { getMyProgress } from '../services/COurseSubscription';
import { displayProgress } from '../utilities/showCourseStatus';

export default function Progress() {
  const [myProgress, setMyProgress] = useState([]);
  const { modules } = useModules();
  const { service } = useService();

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
  return (
    <>
      {assets && <Hero banner={assets.banner} />}
      <Grid>
        <StaticHeader title="Your Progress">
          View or review your completed course material below:
        </StaticHeader>
        {data.length > 0 ? <CardContainer items={data} /> : <h6 className='text-center'>No Progress so Far !</h6>}
      </Grid>
    </>
  );
}
