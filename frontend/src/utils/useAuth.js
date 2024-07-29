import { useState, useEffect } from 'react';

const useAuth = () => {
  return !!localStorage.getItem('token');
};

export default useAuth;
