import React from 'react';

const AdminLayout =async ({children}) => {
      await roleValidator("admin")
       return children;
};

export default AdminLayout;