
import { useEffect, useState } from 'react';

export function useNewUserStatus() {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if this is the user's first visit or they're a new user
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisitedBefore) {
      // If this is the first visit, mark them as a new user
      setIsNewUser(true);
      // Set a flag in localStorage so we don't show the tutorial again
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);
  
  return { isNewUser };
}
