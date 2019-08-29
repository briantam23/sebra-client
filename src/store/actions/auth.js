import { SET_AUTH } from '../constants';
import axios from 'axios';


const _setAuth = auth => ({
    type: SET_AUTH,
    auth
})

export const logout = history => {
    history.push('/login');
    return _setAuth({});
}

export const login = (credentials, history) => (
    dispatch => {
        /* const auth = {
            id: 123,
            balance: 5
        }
        history.push(`/account/${auth.id}`);
        dispatch(_setAuth(auth)); */
        axios.post('https://vast-plains-55545.herokuapp.com/api/login', credentials)
            .then(res => res.data)
            .then(data => {
                console.log(data)
                //dispatch(_setAuth(auth));
            })
    }
)