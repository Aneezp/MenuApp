import { Svg, Line, Path, Circle } from 'react-native-svg';


export const PlusIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
    >
        <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const MinusIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const CartIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Path d="M6 6h15l-1.5 9h-11L6 6z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Circle cx="10" cy="18" r="1.5" fill={color} />
        <Circle cx="17" cy="18" r="1.5" fill={color} />
    </Svg>
);

export const HomeIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Path d="M3 11L12 3l9 8v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);
export const BackIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Path d="M19 12H6M12 5l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const SearchIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Circle cx="11" cy="11" r="6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const LogoutIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M16 17l5-5-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const ImageIcon = ({ width = 24, height = 24, color = "currentColor" }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24">
        <Path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
        <Path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);