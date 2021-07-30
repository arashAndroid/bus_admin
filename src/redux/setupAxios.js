export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      console.log("authToken 1", authToken)
      if (authToken) {

        // console.log("authToken 2", authToken)
        config.headers["x-access-token"] = `${authToken}`;
      } else {

        const auth = localStorage.getItem('authToken');
        console.log("authToken 3", auth);
        if (auth && auth != '') {
          config.headers["x-access-token"] = `${auth}`;
        }

      }

      return config;
    },
    err => Promise.reject(err)
  );

}
