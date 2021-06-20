const redirectToLogin = () => {};

const redirectToHome = () => {};

const redirectToDashboard = (props, response) => {
  // console.log('response ==>', response.data.user.role);
  if (response.data.user.role !== 1) {
    props.push('/dashboard');
  } else {
    props.push('/admin/dashboard');
  }
};

export const Dashboard = {
  redirectToDashboard,
  redirectToHome,
  redirectToLogin,
};
