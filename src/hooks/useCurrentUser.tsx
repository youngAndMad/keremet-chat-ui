import { useState, useEffect } from 'react';

interface CurrentUser  {
    isExists: boolean;
    user: any;
}

function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState<CurrentUser>({ isExists: false, user: null });

    useEffect(() => {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            setCurrentUser({ isExists: true, user: JSON.parse(userData) });
        } else {
            setCurrentUser({ isExists: false, user: null });
        }
    }, []);

    return currentUser;
}

export default useCurrentUser;
