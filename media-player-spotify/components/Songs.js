import React from 'react';
import { useRecoilValue } from 'recoil';
import { playListState } from '../atoms/playlistAtom';
import Song from './Song';

const Songs = () => {
    const playlist = useRecoilValue(playListState)
    return (
        <div className='flex px-8 flex-col space-y-1 pb-28 text-white'>
            {playlist?.tracks?.items.map((song, songOrder) => (
                <Song key={song.track.id} song={song} order={songOrder} />
            ))}
        </div>
    )
};

export default Songs;
