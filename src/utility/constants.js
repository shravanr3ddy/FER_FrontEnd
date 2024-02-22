import { toast } from 'react-toastify';

export const ROUTE_PATHS = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    CAPTURE_EMOTIONS: '/cature_emotions',
    CURRENT_MATCH: '/trends_match',
    FAVOURITES: '/favourites',
    ABOUT_US: '/about',
    CONTACT: '/contact',
    LOGOUT: '/LOGOUT'
}

export const notificationsType = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    INFORAMTION: 'INFORMATION'
}

export const dismissAll = () =>  toast.dismiss();

export const skeleton_loader = [1,2,3,4]