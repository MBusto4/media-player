import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { savedTracksState } from '../atoms/likedSongsAtom';
import { playListState } from '../atoms/playlistAtom';
import Song from './Song';

const Songs = () => {
    const playlist = useRecoilValue(playListState)
    // const savedTracks = useRecoilState(savedTracksState)
    return (
        <div className='flex px-8 flex-col space-y-1 pb-28 text-white'>
            {/* {playlist ? (
                playlist?.tracks?.items.map((song, songOrder) => (
                    <Song key={song.track.id} song={song} order={songOrder} />
                ))
            ) : (
                savedTracks?.tracks?.items.map((song, songOrder) => (
                    <Song key={song.track.id} song={song} order={songOrder} />
                ))
            )} */}
            {playlist?.tracks?.items.map((song, songOrder) => (
                <Song key={song.track.id} song={song} order={songOrder} />
            ))}
        </div>
    )
};

export default Songs;
