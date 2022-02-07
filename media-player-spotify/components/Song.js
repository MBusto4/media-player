import { HeartIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../lib/time';

const Song = ({ order, song }) => {
    const spotifyApi = useSpotify()
    const [currentSongId, setCurrentSongId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    // const [savedSong, setSavedSong] = useState(false)

    // console.log('songs-->', song.track.uri)
    const playSong = () => {
        setCurrentSongId(song.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [song.track.uri]
        })
    }
    // const handlePlayPauseOnDiv = () => {
    //     spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //         if (data.body.is_playing) {
    //             spotifyApi.pause()
    //             setIsPlaying(false)
    //         } else {
    //             playSong()
    //             setIsPlaying(true)
    //         }
    //     })
    // }
    // const saveSong = () => {
    //     spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //         if (data.body.is_playing) {
    //             spotifyApi.addToMySavedTracks()
    //         }
    //     })
    // }

    return (
        <div className='grid grid-cols-3 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-2xl cursor-pointer'
            onClick={playSong}
        >
            <div className='flex items-center space-x-4'>
                <p>{order + 1}</p>
                <img className='h-10 w-10' src={song.track.album.images[0].url} alt="" />
                <div>
                    <p className='w-36 lg:w-64 text-white truncate'>{song.track.name}</p>
                    <p className='w-40'>{song.track.artists[0].name}</p>
                </div>
            </div>

            <div className='flex items-center justify-center ml-auto md:ml-0'>
                <p className='hidden md:inline w-41'>{song.track.album.name}</p>
            </div>

            <div className='flex items-center justify-end ml-auto md:ml-0 '>
                <HeartIcon className='h-5 w-5 mr-5 hover:text-green-500' /*onClick={saveSong}*/ />
                <p className='text-white'>{millisToMinutesAndSeconds(song.track.duration_ms)}</p>
            </div>
        </div>
    )
};

export default Song;
