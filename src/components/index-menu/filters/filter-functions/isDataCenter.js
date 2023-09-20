export const isDataCenter = (venue, dataCenter) => {
    return (venue.venue || venue).location.dataCenter === dataCenter;
};