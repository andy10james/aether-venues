import "./venue-collection.css";
import { VenueCard } from "../venue-card/VenueCard";
// import { HorizontalScroll } from "../horizontal-scroll/HorizontalScroll"
import { Loading } from "../loading/Loading";

export function VenueCollection(props) {
    return <div className={"venue-collection__container " + props.className}>
        <div className="venue-collection__grid">
            { props.venues === null || props.venues === undefined
            ? [ ...Array(Math.floor(Math.random() * 3) + 1)].map((_, i) => <Loading key={i} />)
            : props.venues.map((v) => <VenueCard className="venue-collection__venue-card" venue={v.venue || v} opening={v.opening} key={(v.venue || v).id + (v.opening ? v.opening.start.hour : "")} /> )}
        </div>
    </div>
}