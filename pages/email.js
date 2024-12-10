import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

const Email = ({ token }) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for joining</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Verify your account.</Heading>
          <Text style={text}>
            Thank you for joining our life space. Please click the below verify button to check your
            account.
          </Text>
          <Button href={`http://localhost:3000/verify?token=${token}`}>Verify Account</Button>
        </Container>
      </Body>
    </Html>
  );
};

export default Email;

const main = {
  backgroundColor: '#000000',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: 'auto',
  padding: '96px 20px 64px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '40px',
  margin: '0 0 20px',
};

const text = {
  color: '#aaaaaa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 40px',
};
