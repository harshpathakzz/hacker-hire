'use client';

import React, { useState, useEffect } from 'react';
import { Tldraw, TLUserPreferences, useTldrawUser } from 'tldraw';
import 'tldraw/tldraw.css';
import { useSyncDemo } from '@tldraw/sync';

interface WhiteBoardProps {
  roomId: string;
  username: string;
}

const WhiteBoard: React.FC<WhiteBoardProps> = ({ roomId, username }) => {
  // Use the provided roomId and username from props
  const [userPreferences, setUserPreferences] = useState<TLUserPreferences>({
    id: 'user-' + Math.random(),
    name: username || 'Anonymous',
    color: 'blue',
    colorScheme: 'light',
  });

  // Update user preferences when username changes
  useEffect(() => {
    if (username) {
      setUserPreferences((prev) => ({ ...prev, name: username }));
    }
  }, [username]);

  // Set up the store for collaboration with the provided roomId
  const store = useSyncDemo({ 
    roomId: roomId, 
    userInfo: userPreferences 
  });
  
  const user = useTldrawUser({ userPreferences, setUserPreferences });

  // If no username is provided, show a loading state
  if (!username) {
    return <div className="flex items-center justify-center h-full">Loading whiteboard...</div>;
  }

  return (
    <div className="w-full h-full">
      {/* Added important styles to ensure TLDraw fills the container */}
      <style jsx global>{`
        .tldraw {
          width: 100% !important;
          height: 100% !important;
          position: relative !important;
          overflow: hidden !important;
        }
      `}</style>
      <Tldraw store={store} user={user} />
    </div>
  );
};

export default WhiteBoard;