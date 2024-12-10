import Email from '../email';
import { Resend } from 'resend';
import React from 'react';

const resend = new Resend('re_j8TJFt4w_MJgPU43qG1k1fqDvUapszVsB');

const send = async (req, res) => {
  const data = await resend.sendEmail({
    from: 'onboarding@resend.dev',
    to: 'kevin@techaffinity.com',
    subject: 'Verify Account',
    react: React.createElement(Email, { token: req.body.token }),
  });

  return res.status(200).send(data);
};

export default send;
