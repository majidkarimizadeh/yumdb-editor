import React from 'react';

export interface ITrendProps {
    colorful?: boolean;
    flag: 'up' | 'down';
    style?: React.CSSProperties;
    reverseColor?: boolean;
    className?: string;
}

export default class Trend extends React.Component<ITrendProps, any> {
}
