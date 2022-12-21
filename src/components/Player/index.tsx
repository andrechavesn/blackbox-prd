import React, { useContext, useEffect } from 'react';
import { ChannelContext } from '../../contexts/ChannelContext';

export default function Player() {
  const { channel } = useContext(ChannelContext);

  useEffect(() => {
    const initTerminal = async () => {
      const OvenPlayer = await import('ovenplayer');
      const player = OvenPlayer.create('player_id', {
        autoStart: true,
        autoFallback: true,
        mute: false,
        sources: [
          {
            type: channel ? channel?.value[0].name : '',
            file: channel ? channel?.value[0].url : '',
          },
        ],
        webrtcConfig: {
          timeoutMaxRetry: 4,
          connectionTimeout: 10000,
        },
        waterMark: {
          text: channel ? channel.value[0].name : '',
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
