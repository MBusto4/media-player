import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSongInfo';
import { ReplyIcon, SwitchHorizontalIcon, VolumeOffIcon } from '@heroicons/react/outline';
import { RewindIcon, PauseIcon, PlayIcon, FastForwardIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { debounce } from 'lodash';


const Player = () => {
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [currentSongId, setCurrentSongId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const songInfo = useSongInfo()

    const [volume, setVolume] = useState(50)

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentSongId(data.body?.item?.id)

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentSongId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentSongId, spotifyApi, session]);

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume]);


    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                setIsPlaying(false)
            } else {
                spotifyApi.play()
                setIsPlaying(true)
            }
        })
    }

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((error) => { })
        }, 500), []
    )

    return (
        <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
            {/* Left */}
            <div className='flex items-center space-x-4'>
                <img className='hidden md:inline h-12 w-12' src={songInfo?.album.images?.[0]?.url} alt="" />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            {/* Center */}
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon className='playerButton' />
                <RewindIcon
                    // onClick={() => spotifyApi.skipToPrevious()}
                    className='playerButton' />
                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className='playerButton w-10 h-10' />
                ) : (
                    <PlayIcon onClick={handlePlayPause} className='playerButton w-10 h-10' />
                )}
                <FastForwardIcon className='playerButton' />
                <ReplyIcon className='playerButton' />
            </div>

            {/*Right*/}
            <div className='flex items-center space-x-3 md:space-x-4 justify-end'>
                <VolumeOffIcon className='playerButton' onClick={() => volume > 0 && setVolume(volume - 10)} />
                <input
                    className='w-14 md:w-20'
                    type="range"
                    onChange={(e) => setVolume(Number(e.target.value))}
                    value={volume}
                    min={0}
                    max={100} />
                <VolumeUpIcon className='playerButton' onClick={() => volume > 0 && setVolume(volume + 10)} />

            </div>
        </div>
    )
};

export default Player;
