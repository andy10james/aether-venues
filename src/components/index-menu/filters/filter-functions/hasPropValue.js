export const hasPropValue = (venue, prop, value) => {
    return (venue.venue || venue)[prop] === value;
};