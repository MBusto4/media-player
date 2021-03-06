import React, { useEffect, useState } from 'react';
import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
    LogoutIcon
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { playListIdState } from '../atoms/playlistAtom';


const SideBar = () => {
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playListId, setPlayListId] = useRecoilState(playListIdState)
    const [savedTracks, setSavedTracks] = useState([])
    const [savedTrackId, setSavedTrackId] = useRecoilState(playListIdState)


    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            // spotifyApi.getMySavedTracks().then((data) => {
            //     setSavedTracks(data.body.items)
            //     console.log(savedTracks)
            // })
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
                // console.log(data)
            })
        }
    }, [session, spotifyApi]);

    return (
        <div className='text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen 
        lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'
                    onClick={() => signOut()}>
                    <LogoutIcon className='h-5 w-5' />
                    <p>Logout</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />
                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />


                {playlists?.map((playlist) => (

                    <p
                        className='cursor-pointer hover:text-white'
                        key={playlist.id}
                        onClick={() => setPlayListId(playlist.id)}
                    >
                        {playlist.name}
                    </p>
                ))}
            </div>

        </div>
    )
};

export default SideBar;
