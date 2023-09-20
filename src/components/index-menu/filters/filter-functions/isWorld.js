export const isWorld = (venue, world) => {
    return (venue.venue || venue).location.world === world;
};