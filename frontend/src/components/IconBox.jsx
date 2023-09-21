
import React from 'react';

const IconBox = ({ IconComponent, label, onClick, ...props }) => (
    <div {...props} onClick={onClick} className={`t-w-[120px] t-flex t-flex-col t-h-[120px] t-border t-text-neutral-1 t-rounded-md t-justify-center t-items-center t-cursor-pointer t-transform t-transition-transform t-duration-300 hover:t-bg-white hover:t-scale-110 hover:t-z-10 hover:t-shadow-lg ${label === 'invisible' ? 't-invisible' : 't-visible'}`}>
        <span><IconComponent style={{ fontSize: '20px', color: '#08c' }} /></span>
        <span className='t-text-center'>{label}</span>
    </div>
);

export default IconBox;
