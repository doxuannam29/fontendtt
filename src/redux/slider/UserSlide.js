import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    password: '',

    address: '',
    phone: '',
    avatar: '',
    id: '',

    access_token: '',
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token, avatar = '', password = '', phone = '', address = '', _id = '', isAdmin } = action.payload
            console.log('acction', action)
            state.name = name;
            state.email = email;
            state.id = _id;
            state.password = password;
            state.address = address;
            state.phone = phone;
            state.avatar = avatar;


            state.access_token = access_token;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {

            state.name = '';
            state.email = '';
            state.id = '';
            state.access_token = '';
            state.password = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.isAdmin = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer