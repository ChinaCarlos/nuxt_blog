export default function({ $axios, redirect }) {
  //   $axios.onRequest(config => {
  //     console.log('Making request to ' + config.url);
  //   });
  const token = sessionStorage.getItem('token');
  if (token) {
    $axios.setToken(token, 'Bearer');
  }
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      // redirect('/401')
      console.log('response code ' + code);
    }
  });
}
