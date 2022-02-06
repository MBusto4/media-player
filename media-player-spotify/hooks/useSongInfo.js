import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from './useSpotify';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';

const useSongInfo = () => {

    const spotifyApi = useSpotify()
    const [currentSongId, setCurrentSongId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentSongId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentSongId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then(response => response.json())
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo()
    }, [currentSongId, spotifyApi]);

    return songInfo
};


export default useSongInfo;
