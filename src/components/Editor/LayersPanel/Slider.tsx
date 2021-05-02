import React from 'react'

interface Props {
    val: number; 
    setVal: (val: number) => void;
    classNames?: string
}

const Slider:React.FC<Props> = ({ val, setVal, classNames }) => {
    return (
        <input
          className={`mr-1 rounded-lg overflow-hidden appearance-none bg-muidark-2 h-3 w-auto flex-grow ${classNames}`}
          type="range"
          min="1"
          max="100"
          step="1"
          value={val}
          onChange={e => setVal(parseInt(e.target.value))}
        />
    )
}

export default Slider
