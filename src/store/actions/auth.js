import { SET_CUSTOMER_AUTH, SET_BUSINESS_AUTH, REMOVE_AUTH } from '../constants';
import axios from 'axios';


export const exchangeTokenForAuth = history => (
    dispatch => {
        const token = window.localStorage.getItem('token');
        if(!token) return;
        return axios.get('https://vast-plains-55545.herokuapp.com/api/auth', { headers: { authorization: token } })
            .then(res => res.data)
            .then(auth => {
                dispatch(_setCustomerAuth(auth));
                //if(history) history.push(/profile/${auth.id});
            })
            .catch(ex => window.localStorage.removeItem('token'))
    }
)

const _setCustomerAuth = auth => ({
    type: SET_CUSTOMER_AUTH,
    auth
})
const _setBusinessAuth = auth => ({
    type: SET_BUSINESS_AUTH,
    auth
})
const _removeAuth = auth => ({
    type: REMOVE_AUTH,
    auth
})

/* export const logout = (history, recipientAddress, chargeAmount) => (
    dispatch => {
        axios.post('https://vast-plains-55545.herokuapp.com/api/logout')
            .then(res => res.data.data)
            .then(data => {
                console.log(data)
                recipientAddress && chargeAmount 
                    ? history.push(`/login/${recipientAddress}/${chargeAmount}`) 
                    : history.push('/login')
                dispatch(_removeAuth({}))
            })
    }
) */
export const logout = (history, recipientAddress, chargeAmount) => {
    window.localStorage.removeItem('token');
    //history.push('/profile');
    return _setCustomerAuth({});
 }

/* export const login = (state, params, history) => {
    const { username, password, type } = state;
    const { recipientAddress } = params;
    const chargeAmount = Number(params.chargeAmount);
    return dispatch => (
        type === 'customer'
            ? ( axios.post('https://vast-plains-55545.herokuapp.com/api/login', { username, password, credentials: 'same-origin',})
                    .then(res => res.data.data)
                    .then(data => {
                        if(recipientAddress && chargeAmount) { 
                            history.push(`/account/${recipientAddress}/${chargeAmount}`);
                        }
                        else history.push('/account');
                        dispatch(_setCustomerAuth(data));
                    })
        )
        : ( axios.post('https://vast-plains-55545.herokuapp.com/api/businessLogin', { username, password })
                .then(res => res.data.data)
                .then(data => {
                    history.push('/dashboard');
                    dispatch(_setBusinessAuth(data));
                })
        )
    )
} */
export const login = (state, params, history) => {
    const { username, password, type } = state;
    const { recipientAddress } = params;
    const chargeAmount = Number(params.chargeAmount);
    return dispatch => (
        axios.post('https://vast-plains-55545.herokuapp.com/api/auth', { username, password })
            .then(res => res.data)
            .then(data => {
                console.log(data)
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth(history));
            })
    )
}