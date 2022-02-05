import React from 'react';
import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }) => {
    return (
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            <img className='mb-10 w-2/5' src="https://www.seekpng.com/png/full/176-1760560_white-music-notes-transparent-background-download-white-music.png" alt="" />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className='bg-[#18D860] text-white p-5 rounded-full'
                        onClick={() => signIn(provider.id, {
                            callbackUrl: '/'
                        })}
                    >
                        Login with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    )
};

export default Login;

//server side rendering
export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}
