import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export const USER_STATE_CHANGE = 'USER_STATE_CHANGE'

export const userAuthStateListener = () => dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            dispatch(getCurrentUserData())
        } else {
            dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true })
        }
    })
}

export const getUserById = (id) => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((snapshot) => {
            resolve(snapshot.exists ? snapshot.data() : null)
        })
        .catch(() => reject())
})

export const getCurrentUserData = () => dispatch => {
    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((res) => {
            if (res.exists) {
                return dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: res.data(),
                    loaded: true
                })
            }
        })
}

export const saveUserField = (name, imageURL, email, phone, birthday, address) => new Promise((resolve, reject) => {
    let obj = {
        imageURL,
        name,
        email,
        phone,
        birthday,
        address
    };
    console.log('test', name, imageURL, email, phone, birthday, address)
    // obj[field] = value
    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .update(obj)
        .then(() => resolve())
        .catch(() => reject())
})