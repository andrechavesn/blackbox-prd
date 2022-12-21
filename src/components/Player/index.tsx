import React, { useContext, useEffect } from 'react';
import OvenPlayer from 'ovenplayer';
import { useRouter } from 'next/router';
import { api } from '../../services/api/api';
import { ChannelContext } from '../../contexts/ChannelContext';
import { withSSRAuth } from '../../utils/withSSRAuth';

export default function Player() {
  const { handleChannel, channel } = useContext(ChannelContext);

  // useEffect(() => {
  //   handleChannel(router.query.id as string);
  // }, [router.query.id, handleChannel]);

  useEffect(() => {
    if (channel) {
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
    }
  }, [channel]);

  return <div id="player_id" />;
}

// export const getServerSideProps = withSSRAuth(async ctx => {
//   try {
//     const { id } = ctx.params;

//     const response = await api.get(`/Channel/${id}`);

//     const channel = {
//       ...response.data,
//     };
//     return {
//       props: { channel },
//     };
//   } catch (err) {
//     return {
//       props: {},
//       notFound: true,
//     };
//   }
// });
