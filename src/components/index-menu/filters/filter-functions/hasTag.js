export const hasTag = (venue, arg) =>
{
    const tags = (venue.venue || venue).tags;
    if (!tags) return false;
    for (let tag of tags) {
        if (!tag) continue;
        if (tag.toLowerCase() === arg.toLowerCase())
            return true;
    }
    return false;
};