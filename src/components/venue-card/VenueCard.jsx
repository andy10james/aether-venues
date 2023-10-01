import React from "react";
import "./venue-card.css";
import { Modal } from "../modal/Modal";
import { Time } from "../time/Time";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { VenueOpening } from "../venue-opening/VenueOpening";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import defaultImage from "./default-banner.jpg";
import { Location } from "../location/Location";

class VenueCard extends VenueOpening {

    render() {
        const classes = [];
        classes.push("venue-card__container");
        if (this.props.className) classes.push(this.props.className);
        if (this.props.venue.isNew()) classes.push("venue-card__container--new");
        if (this.props.venue.open) classes.push("venue-card__container--open");
        if (favouritesService.isFavourite(this.props.venue.id))
            classes.push("venue-card__container--favorite");
        if (visitedService.isVisited(this.props.venue.id))
            classes.push("venue-card__container--visited");

        return <>

            <div id={"venue-" + (this.props.venue.id)}
                 className={classes.join(" ")}
                 onClick={ this._onVenueClick.bind(this) }>

                <div className="venue-card__photo-container">
                    <img className="venue-card__photo" src={this.props.venue.bannerUri || defaultImage} alt="" loading="lazy" />
                </div>

                <div className="venue-card__tags">
                    <div className="venue-card__open">Open now</div>
                    <div className="venue-card__new">New</div>
                    <div className="venue-card__favorite">Favorite</div>
                    <div className="venue-card__visited">Visited</div>
                </div>

                <div className="venue-card__summary">
                    <div className="venue-card__name">
                        { this.props.venue.name }
                    </div>

                    { this.props.opening &&
                        <div className="venue-card__time">
                            <div className="venue-card__start"><Time time={this.props.opening.local.start} day={this.props.opening.local.day} format24={false} /></div>
                            <div className="venue-card__time-split">{this.props.opening.local.end && <React.Fragment>-</React.Fragment>}</div>
                            <div className="venue-card__end">{this.props.opening.local.end && <Time time={this.props.opening.local.end} day={this.props.opening.local.day} format24={false} /> }</div>
                        </div>
                    }
                </div>
            </div>
            { this.state.openModal &&
                <Modal className="venue-modal" onStageClick={this._onCloseClick.bind(this)}>
                    <button className="venue-modal__close-button" onClick={this._onCloseClick.bind(this)}><img src="assets/cross.svg" alt="" /></button>
                    <VenueProfile venue={this.props.venue} />
                </Modal>
            }
        </>
    }

}

export { VenueCard };