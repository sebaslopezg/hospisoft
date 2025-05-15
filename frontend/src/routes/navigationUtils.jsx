import { useNavigate } from 'react-router';

export const NavigationUtils = () => {
  const navigate = useNavigate();

  const reloadPage = () => {
    navigate(0); // Passing 0 to navigate reloads the current page
  };

  return { reloadPage };
};