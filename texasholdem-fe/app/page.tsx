'use client'

import { useEffect } from 'react';
import io from 'socket.io-client';

const apiBaseUrl = 'http://localhost:5000';
const socket = io(apiBaseUrl);

export default function Home() {
  // Fetch current game information
  const getGameInfo = () => {
    fetch(`${apiBaseUrl}/api/game_info`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  // Take a random action
  const takeRandomAction = () => {
    fetch(`${apiBaseUrl}/api/take_random_action`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  useEffect(() => {
    // Listen for 'game_info' events from the server
    socket.on('game_info', (data) => {
      console.log('Received game info:', data);
      // Update your UI with the received game information
    });

    // Clean up socket.io event listeners when the component unmounts
    return () => {
      socket.off('game_info');
    };
  }, []);

  return (
    <main>
      <div>hello</div>
      <button onClick={getGameInfo}>Get game</button>
      <button onClick={takeRandomAction}>Take action</button>
    </main>
  );
}
