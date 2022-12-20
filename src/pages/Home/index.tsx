import React, { useState } from 'react';
import { Player } from '../../components/Player';
import { Sidebar } from '../../components/Sidebar';

export default function Home() {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');

  return (
    <Sidebar>
      <Player title={selectedTitle} selectedChannel={selectedChannel} />
    </Sidebar>
  );
}
