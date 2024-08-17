import React from "react";
import "./venue-card.css";
import { Modal } from "../modal-stage/Modal";
import { favouritesService } from "../../services/favouritesService";
import { visitedService } from "../../services/visitedService";
import { VenueProfile } from "../venue-profile/VenueProfile";
import { VenueListing } from "../venue-listing/VenueListing";
import defaultImage from "./default-banner.jpg";
import {DateString} from "../date-string/DateString";
import {TimeString} from "../time-string/TimeString";
import {ModalCloseButton} from "../modal-stage/ModalCloseButton";

class VenueCard extends VenueListing {

    render() {
        const openingResolution = this.props.opening?.resolution || this.props.venue.resolution;
        const classes = [];
        classes.push("venue-card__container");
        if (this.props.className) classes.push(this.props.className);
        if (this.props.venue.isNew()) classes.push("venue-card__container--new");
        if (this.props.venue.resolution?.isNow) classes.push("venue-card__container--open");
        if (!this.props.venue.resolution) classes.push("venue-card__container--no-time"); // make sure to update `venue-card-no-time` css class to this
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

                    { openingResolution &&
                      <div className="venue-card__time">
                        <div className="venue-card__date"><DateString date={openingResolution.start} /></div>
                        <div className="venue-card__start"><TimeString date={openingResolution.start} format24={false} /></div>
                        <div className="venue-card__time-split">-</div>
                        <div className="venue-card__end"><TimeString date={openingResolution.end} format24={false} /></div>
                      </div>
                    }
                </div>
            </div>
            { this.state.openModal &&
                <Modal className="venue-modal" onStageClick={this._onCloseClick.bind(this)}>
                    <ModalCloseButton onClick={this._onCloseClick.bind(this)} />
                    <VenueProfile venue={this.props.venue} />
                </Modal>
            }
        </>
    }

}

export { VenueCard };