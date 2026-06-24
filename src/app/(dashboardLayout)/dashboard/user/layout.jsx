import { roleValidator } from '@/lib/api/session';
import React from 'react';

const UserLayout =async ({children}) => {

    await roleValidator("user")
    return children;
};

export default UserLayout;