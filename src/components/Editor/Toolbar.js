import React, { useState } from "react";
//TODO: export via codepen API

const TBDropdown = () => {
  const [open, setOpen] = useState(false);

  const Arrow = () => (
    <svg
      class="-mr-1 ml-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  );

  const DropdownContent = () => (
    <div
      className={`mt-2 w-56 origin-top-right absolute right-0 rounded-md shadow-lg bg-muidark-5`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1"
    >
      <div className="py-1" role="none">
        <a
          href="/"
          className="px-4 py-2 text-white text-sm block "
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
        >
          Account settings
        </a>
        <a
          href="/"
          className="px-4 py-2 text-white text-sm block"
          role="menuitem"
          tabindex="-1"
          id="menu-item-1"
        >
          Support
        </a>
        <a
          href="/"
          className="px-4 py-2 text-white text-sm block"
          role="menuitem"
          tabindex="-1"
          id="menu-item-2"
        >
          License
        </a>
        <form method="POST" action="#" role="none">
          <button
            type="submit"
            className="px-4 py-2 w-full text-white text-left text-sm block"
            role="menuitem"
            tabindex="-1"
            id="menu-item-3"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="px-4 py-2 w-full text-sm font-medium text-white bg-muidark-4 rounded-md shadow-lg  inline-flex justify-center hover:bg-muidark-5 default-focus-ring"
          onClick={() => setOpen(!open)}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Finalize
          <Arrow />
        </button>
      </div>
      {open ? <DropdownContent /> : null }
    </div>
  );
};

const Toolbar = () => {
  return (
    <div className="flex justify-evenly flex-shrink">
      <div class="p-3 mt-4 mr-4 w-full max-w-screen-lg bg-muidark-2 rounded-md flex items-center justify-around">
        <span>
          <label className="pl-1 pr-3 text-white text-sm font-medium">
            Width:
          </label>
          <input
            type="number"
            value={9999}
            class="px-2 py-2 w-16 basic-clickable"
          />
        </span>
        <span>
          <label className="pl-3 pr-3 text-white text-sm font-medium">
            Height:
          </label>
          <input
            type="number"
            value={9999}
            class="px-2 py-2 w-16 basic-clickable"
          />
        </span>

        <h1 className="mr-1 ml-1 text-white opacity-20">|</h1>

        <label className="pl-3 pr-3 text-white text-sm font-medium">
          Randomize:
        </label>
        <button class="px-4 py-2 ml-1 mr-1 basic-clickable"> Terms </button>
        <button class="px-4 py-2 ml-1 mr-1 basic-clickable"> Blending </button>
        <button class="px-4 py-2 ml-1 mr-1 basic-clickable"> Effects </button>

        <h1 className="mr-1 ml-1 text-white opacity-20">|</h1>

        <TBDropdown />
      </div>
    </div>
  );
};

export default Toolbar;
