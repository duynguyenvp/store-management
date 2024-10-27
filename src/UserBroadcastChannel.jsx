import React from "react";
import { useEffect } from "react";
import { BroadcastChannel } from 'broadcast-channel';
import { AUTH_BROAD_CAST } from "constants/broadcast";
const channel = new BroadcastChannel(AUTH_BROAD_CAST.channel);

const UserBroadcastChannel = () => {
  useEffect(() => {
    channel.onmessage = msg => console.dir(msg);

    return () => {
      channel.close();
    };
  }, []);
};

export default UserBroadcastChannel;
