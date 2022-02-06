import { ChevronDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playListState } from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-red-500",
    "from-green-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = () => {
    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const [color, setColor] = useState(null)
    const playListId = useRecoilValue(playListIdState)
    const [playlist, setPlayList] = useRecoilState(playListState)
    // const [likedSongs, setLikedSongs] = useState(null)



    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playListId]);

    useEffect(() => {
        // spotifyApi.getMySavedTracks().then((data) => {
        //     setLikedSongs(data.body.items)
        // })
        spotifyApi.getPlaylist(playListId).then((data) => {
            setPlayList(data.body)
        }).catch(error => console.log("Something went wrong", error))
    }, [spotifyApi, playListId]);

    // console.log(playlist)
    // console.log(likedSongs)



    return (
        <div className='flex-grow'>
            <header className='absolute top-5 right-8'>
                <div className='flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className='rounded-full w-10 h-10' src={session?.user?.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img src={playlist?.images?.[0].url} className='h-44 w-44 shadow-2xl' alt="" />
                <div>
                    <p>PLAYLIST</p>
                    <h2 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playlist?.name}</h2>
                </div>
            </section>

            <div>
                <Songs />
            </div>
        </div>
    )
};

export default Center;
