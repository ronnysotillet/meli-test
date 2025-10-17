

import React, { useState } from 'react';

type DynamicRadioButtonsProps = {
    options: Array<any>;
    onSelect: (value: string) => void;
};

const DynamicRadioButtons = ({ options, onSelect }: DynamicRadioButtonsProps) => {

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event: any) => {
        const value = event.target.value;
        setSelectedOption(value);
        onSelect(value);
    };

    return (
        <div>
            <h3>Select an option:</h3>
            {options.map((option) => (
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="radio"
                        id={option.value}
                        name="dynamicRadio"
                        value={option.value}
                        className="hidden peer"
                        onChange={handleOptionChange}
                        checked={selectedOption === option.value}
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-gray-500 peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all duration-200"></span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
};

export default DynamicRadioButtons;