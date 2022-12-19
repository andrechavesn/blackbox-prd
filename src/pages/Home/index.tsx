import React, { useState } from 'react';
import { Player } from '../../components/Player';
import { Sidebar } from '../../components/Sidebar';

export default function Home() {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');

  const handleRequest = (title: string, channel: string) => {
    setSelectedTitle(title);
    setSelectedChannel(channel);
  };
  return (
    <Sidebar onChannelRequest={() => handleRequest}>
      <Player title={selectedTitle} selectedChannel={selectedChannel} />
    </Sidebar>
  );
}
