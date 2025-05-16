import {useLocation} from 'react-router'

export const NavigationUtils = () => {
  const location = useLocation();
  return <PageImpl key={location.key} />
};