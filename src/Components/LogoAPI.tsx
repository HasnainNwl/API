'use client';
import React, { useState } from 'react'
import { RotatingLines } from 'react-loader-spinner';

const LogoAPI = () => {
    const [logos, setLogos] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');
    

    const getLogos = () => {
        if (name.length > 0 || ticker.length > 0) {
            
            const apiUrl = `https://api.api-ninjas.com/v1/logo?name=${name}&ticker=${ticker}`;
            setLoading(true);
            fetch(apiUrl, {
                method: 'GET',
                headers: { 'X-Api-Key': 'w/HySdKFLR391RhkMeoB+A==zq4AfTPIAz5DSID5' },
            })
                .then(response => response.json())
                .then(data => { setLogos(data); setLoading(false) })
                .catch(error => setLoading(false));
        } else {
            alert('Enter atleast One Option')
        }
    }

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md  mx-auto w-full flex items-center space-x-4">
                <input type="text" className="border rounded-lg px-4 py-2 w-[40%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                     <input type="text" className="border rounded-lg px-4 py-2 w-[40%] focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ticker"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)} />
                
                <button type='button' className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => getLogos()}>Search</button>
            </div>

            {loading ? <div className='flex items-center justify-center h-screen'><RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            /> </div> : logos.length > 0 ? logos.map(logo => {
                return <section key={logo.name} className="bg-white dark:bg-gray-800">
                    <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
                                    {logo.name}
                                </h1>
                                
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
                            <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
                                src={logo.image} alt={logo.name + 'Image'} />
                        </div>
                    </div>
                </section>
            }) : <div className="flex items-center justify-center h-screen">
                <p>Could Not find data for above query!</p>
            </div>}

        </>
    )
}

export default LogoAPI;