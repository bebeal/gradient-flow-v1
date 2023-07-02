import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();
  const pageTitle = location.pathname.replace('/', '');

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return {
    pageTitle,
  };
};

export default usePageTitle;
