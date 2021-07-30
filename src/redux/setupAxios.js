export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
        config => {
            const {
                auth: { authToken }
            } = store.getState();

            console.log("authToken 1", authToken)
            if (authToken) {

                // console.log("authToken 2", authToken)
                config.headers.Authorization = `Bearer ${authToken}`;
            } else {

                const auth = localStorage.getItem('authToken');
                console.log("authToken 3", auth);
                if (auth && auth != '') {
                    config.headers.Authorization = `Bearer ${auth}`;
                }

            }

            return config;
        },
        err => Promise.reject(err)
    );
}
