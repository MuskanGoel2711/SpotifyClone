import TrackPlayer, { Event } from 'react-native-track-player';

export const PlaybackService = async function () {

    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());

    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener('remote-pause', () => {
        TrackPlayer.pause();
    });

    // ...

};