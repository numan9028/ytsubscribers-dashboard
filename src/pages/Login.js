import { Navigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Container, Typography, } from '@mui/material';
import PageLoader from 'src/components/UI/PageLoader';
// layouts
// components
import Page from '../components/Page';
import { LoginForm } from '../sections/authentication/login';
import withAuthentication from 'src/components/HOC/withAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));



// ----------------------------------------------------------------------

function Login(props) {

  return props.loading ? <PageLoader /> : props.user?.isAuth ? <Navigate to="/dashboard/app" /> : (
    <RootStyle title="Login">

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          Hi, Welcome Back
        </Typography>
        <img src="/static/illustrations/illustration_login.png" alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>

          <LoginForm />

        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default withAuthentication(Login);