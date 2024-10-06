import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../config/firebaseConfig'; 

const Avatar: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <div className="avatar text-xs md:text-lg">
      <span>{email}</span> {/* Display the user's email */}
    </div>
  );
};

export default Avatar;
