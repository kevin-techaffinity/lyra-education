import React from 'react';
import { getCookie } from 'cookies-next';
import { VscSignOut } from "react-icons/vsc";

import useService from '../hooks/useService';
import useSubscribed from '../hooks/useSubscribed';
import styles from '../styles/components/Header.module.sass';

import GhostButton from './GhostButton';
import Grid from './Grid';
import Logo from './Logo';
import { autologout } from '../services/User';

export default function Header() {
  const { service } = useService();
  const { subscriptionStatus } = useSubscribed();

  const { loginUrl } = service;

  const loggedIn = !!getCookie('token');

  const handleLogout = () => {
    autologout();

    window.location = '/';
  }

  if (!service) return null;

  return (
    <Grid>
      <header className={styles.header}>
        <Logo />
        <div className='d-flex justify-content-center align-items-center gap-10'>
          <div className={styles.header__column}>
            {loggedIn && true && (
              <GhostButton href="/progress" badge>
                Your Progress
              </GhostButton>
            )}
            {!loggedIn && <GhostButton href={'/signup'}>Join Now</GhostButton>}
          </div>
          {loggedIn &&
            <button onClick={handleLogout} className='border-0 px-5 bg-white py-2'>
              <VscSignOut size={25} /> &nbsp;
              Sign Out
            </button>
          }
        </div>

      </header>
    </Grid>
  );
}
