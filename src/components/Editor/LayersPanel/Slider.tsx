import React from 'react'

interface Props {
    val: number; 
    setVal: (val: number) => void;
    classNames?: string
    disabled?: boolean
}

const Slider:React.FC<Props> = ({ val, disabled, setVal, classNames }) => {
    return (
        <input
          className={`mr-2 rounded-lg overflow-hidden appearance-none bg-muidark-2 h-3 w-auto flex-grow disabled:opacity-40 ${classNames}`}
          type="range"
          min="1"
          max="100"
          step="1"
          value={val}
          disabled={disabled ? disabled : false}
          onChange={e => setVal(parseInt(e.target.value))}
        />
    )
}

export default Slider
