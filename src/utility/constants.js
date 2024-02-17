import { toast } from 'react-toastify';

export const ROUTE_PATHS = {
    HOME: '/',
    CAPTURE_EMOTIONS: '/cature_emotions',
    CURRENT_MATCH: '/trends_match',
    FAVOURITES: '/favourites',
    ABOUT_US: '/about',
    CONTACT: '/contact',
    DOCUMENTATION: '/documentation'
}

export const notificationsType = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    INFORAMTION: 'INFORMATION'
}

export const dismissAll = () =>  toast.dismiss();

export const skeleton_loader = [1,2,3,4]