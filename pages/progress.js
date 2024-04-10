import React from 'react';
import { Remarkable } from 'remarkable';

import CardContainer from '../components/CardContainer';
import Grid from '../components/Grid';
import StaticHeader from '../components/headers/StaticHeader';
import Hero from '../components/Hero';
import useModules from '../hooks/useModules';
import useService from '../hooks/useService';

export default function Progress() {
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

  return (
    <>
      {assets && <Hero banner={assets.banner} />}
      <Grid>
        <StaticHeader title="Your Progress">
          View or review your completed course material below:
        </StaticHeader>
        <CardContainer items={modules.filter((o) => ['PENDING', 'COMPLETED', 'ACTIVE'].includes(o.status))} />
      </Grid>
    </>
  );
}
