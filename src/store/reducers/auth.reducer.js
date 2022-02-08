import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from "../actions/types"

const initialState = {
    username: '',
    uid: '',
    profile: {
        firstname: '',
        lastname: '',
        patronymic: '',
        prosecutor: '',
        position: '',
        role: ''
    },
    token: {
        authenticated: false,
        accessToken: '',
        refreshToken: ''
    },
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_SUCCESS:
            return {
                username: action.payload.username,
                uid: action.payload.uid,
                profile: action.payload.profile,
                token: action.payload.token
            }

        case SIGNOUT_SUCCESS:
            return initialState

        default:
            return state
    }
}

export default authReducer