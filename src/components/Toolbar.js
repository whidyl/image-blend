import React, { useState } from 'react'

const Toolbar = () => {
    const [ddOpen, setDdOpen] = useState(false);

    const renderDropdown = () => {
        return (
            <div className="relative inline-block text-left">
                <div>
                    <button type="button" className="inline-flex justify-center w-full rounded-md shadow-lg px-4 py-2 bg-muidark-4 text-sm font-medium text-white hover:bg-muidark-5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30" onClick={() => setDdOpen(!ddOpen) } id="menu-button" aria-expanded="true" aria-haspopup="true">
                        Finalize
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-muidark-5 ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity ease-out duration-100 transform ${ddOpen ? 'opacity-100' : 'opacity-0'}`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                        <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                        <a href="#" className="text-white block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                        <form method="POST" action="#" role="none">
                            <button type="submit" className="text-white block w-full text-left px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">
                                Sign out
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        );
    }

    return (
        <div className="flex justify-evenly flex-shrink">
            <div class="bg-muidark-2 p-3 mt-4 mr-4 rounded-md flex items-center justify-around w-full ">
                <span className="">
                    <label className="text-white text-sm font-medium pl-1 pr-3"> Width: </label>
                    <input type="number" value={9999} class="px-2 py-2 text-white text-sm font-medium bg-muidark-4 rounded border-0 shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 w-16"/>
                </span>
                <span className="">
                    <label className="text-white text-sm font-medium pl-3 pr-3"> Height: </label>
                    <input type="number" value={9999} class="px-2 py-2 text-white text-sm font-medium bg-muidark-4 rounded border-0 shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30 w-16"/>
                </span>

                <h1 className="mr-1 ml-1 text-white opacity-20">|</h1>

                <label className="text-white text-sm font-medium pl-3 pr-3"> Randomize: </label>
                <button class="px-2 py-2 ml-1 mr-1 text-white text-sm font-medium bg-muidark-4 rounded border-0 shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"> Terms </button>
                <button class="px-2 py-2 ml-1 mr-1 text-white text-sm font-medium bg-muidark-4 rounded border-0 shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"> Blending </button>
                <button class="px-2 py-2 ml-1 mr-1 text-white text-sm font-medium bg-muidark-4 rounded border-0 shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"> Effects </button>
                
                <h1 className="mr-1 ml-1 text-white opacity-20">|</h1>
                {renderDropdown()}
                {/* <button class="px-2 py-2 ml-1 mr-1 text-white bg-muidark-4 rounded text-sm border-0 shadow-lg outline-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"> Finalize </button> */}
            </div>


        </div>
    );
}

export default Toolbar