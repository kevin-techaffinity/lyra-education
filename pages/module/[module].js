import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Remarkable } from 'remarkable';

import ContentContainer from '../../components/ContentContainer';
import OutlineContainer from '../../components/course-outline/OutlineContainer';
import Grid from '../../components/Grid';
import ModuleHeader from '../../components/headers/ModuleHeader';
import Hero from '../../components/Hero';
import useService from '../../hooks/useService';
import { getModule } from '../../services/Content';
import { useModuleContext } from '../../context/ModuleContext';

export default function Index() {
  const router = useRouter();
  const [slug, setSlug] = useState('/');
  const [module, setModule] = useState(null);
  const { service } = useService();
  const { setCourse } = useModuleContext()

  useEffect(() => {
    getModule(router.query.module).then((data) => {
      const { chapters } = data;
      const chapter = chapters.find((o) => o.status !== 'COMPLETED') || {};
      const pages = chapter.pages || [];
      const progress = pages.find((o) => ['PENDING'].includes(o.status));
      setSlug(progress ? progress.slug : '');
      setModule(data);
      setCourse(data)
    });
  }, [router.query.module]);

  const md = new Remarkable();
  md.set({
    html: true,
    breaks: true,
  });

  if (!module) return null;
  if (!service) return null;

  return (
    <div>
      {service.assets && <Hero banner={service.assets.banner} />}
      <Grid>
        <ModuleHeader item={module} slug={slug} />
        <ContentContainer>
          <span dangerouslySetInnerHTML={{ __html: md.render(module.description) }} />
          <OutlineContainer chapters={module.chapters} slug={slug} />
        </ContentContainer>
      </Grid>
    </div>
  );
}
