import React, { useContext, useEffect } from 'react';
import { ChannelContext } from '../../contexts/ChannelContext';

export default function Player() {
  const { channel } = useContext(ChannelContext);
  console.log('🚀 ~ file: index.tsx:6 ~ Player ~ channel', channel);

  useEffect(() => {
    const initTerminal = async () => {
      const OvenPlayer = await import('ovenplayer');
      const player = OvenPlayer.create('player_id', {
        autoStart: true,
        autoFallback: true,
        mute: false,
        sources: [
          {
            type: channel.split('app/')[1],
            file: channel,
          },
        ],
        webrtcConfig: {
          timeoutMaxRetry: 4,
          connectionTimeout: 10000,
        },
        waterMark: {
          text: channel ? channel.split('app/')[1] : '',
          font: {
            'font-size': '20px',
            color: 'yellow',
            'font-weight': 'bold',
          },
          position: 'top-right',
        },
      });
      player.play();
    };
    initTerminal();
  }, [channel]);

  return <div id="player_id" />;
}
