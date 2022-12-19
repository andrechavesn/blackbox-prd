import React, { useEffect } from 'react';
import OvenPlayer from 'ovenplayer';

interface PlayerProps {
  selectedChannel: string;
  title: string;
}
export function Player({ selectedChannel, title }: PlayerProps) {
  useEffect(() => {
    const player = OvenPlayer.create('player_id', {
      autoStart: true,
      autoFallback: true,
      mute: false,
      sources: [
        {
          type: 'webrtc',
          file: `${selectedChannel}`,
        },
      ],
      webrtcConfig: {
        timeoutMaxRetry: 4,
        connectionTimeout: 10000,
      },
      waterMark: {
        text: `1${title}`,
        font: {
          'font-size': '20px',
          color: 'yellow',
          'font-weight': 'bold',
        },
        position: 'top-right',
      },
    });
    player.play();
  }, [selectedChannel, title]);

  return <div id="player_id" />;
}
