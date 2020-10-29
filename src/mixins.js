export const white = '#ffffff';
export const black = '#000000';
export const lightOrange = '#ffe8d0';
export const orange = '#fec776';
export const blue = '#6acee3';
export const red = '#e45965';
export const purple = '#904a6e';

export const YanoneKaffeesatz = 'YanoneKaffeesatz, Arial, sans-serif';
export const LuckiestGuy = 'LuckiestGuy, Arial, sans-serif';

export const breakpoint1 = 1440;
export const breakpoint2 = 1200;
export const breakpoint3 = 1000;
export const breakpoint4 = 786;
export const breakpoint5 = 576;

export const cornerRadius = "30px";

export const shadowTopLeft = "-4px -4px 14px -1px rgba(125,125,125,0.87)";
export const shadowButtonRight = "+4px +4px 14px -1px rgba(125,125,125,0.87)";
export const shadowAllDirections = "0px 0px 7px 1px rgba(125,125,125,0.87)";

export function classNames() {
    return Array.prototype.slice.call(arguments).join(" ");
}

export const belowBreakpoint = (breakpoint, content) => ({
    [`@media only screen and (max-width: ${breakpoint - 1}px)`]: content,
});

export const aboveBreakpoint = (breakpoint, content) => ({
    [`@media only screen and (min-width: ${breakpoint - 1}px)`]: content,
});