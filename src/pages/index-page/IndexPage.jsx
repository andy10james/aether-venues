import React, {useEffect, useState} from "react";
import {venueService} from "../../services/venues/venueService";
import {Modal} from "../../components/modal/Modal";
import {VenueProfile} from "../../components/venue-profile/VenueProfile";
import {VenueDirectory} from "../../components/venue-directory/VenueDirectory";
import {IndexMenu} from "../../components/index-menu/IndexMenu";
import crossIcon from "../../assets/icons/cross.svg";
import './index-page.css';

export const IndexPage = () => {
  const [ requestedVenue, setRequestedVenue ] = useState(null);

  useEffect(() => {
    const requestedVenueId = window.location.hash.substring(1);
    venueService.getVenueById(requestedVenueId).then(setRequestedVenue);
  }, []);

  return (
    <div className="index-page__container">
      <IndexMenu className="index-page__index-menu" />
      <VenueDirectory className="index-page__venue-directory" />

      { requestedVenue &&
        <Modal className="venue-modal" onStageClick={_ => setRequestedVenue(null) }>
          <button className="venue-modal__close-button" onClick={_ => setRequestedVenue(null)}>
            <img src={crossIcon} alt="" />
          </button>
          <VenueProfile venue={requestedVenue} />
        </Modal>
      }
    </div>
  )
}