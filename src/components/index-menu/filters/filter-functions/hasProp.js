export const hasProp = (venue, prop) => {
    const propValue = (venue.venue || venue)[prop];
    return propValue !== null && propValue !== undefined;
};