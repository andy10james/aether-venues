import React, {useState} from "react";
import {Modal} from "../modal/Modal";
import {NewVenueGuidance} from "../new-venue-guidance/NewVenueGuidance";
import {FilterMenu} from "../filter-menu/FilterMenu";
import {worldFilters} from "./filters/worldFilters";
import globeIcon from "../../assets/icons/globe.svg";
import crossIcon from "../../assets/icons/cross.svg";


export const IndexMenu = (props) => {
  const [showNewVenueModal, setShowNewVenueModal] = useState(false)

  return (
    <>
      <div className={"index-menu__container " + props.className}>
        <FilterMenu heading={{
          name: "All regions",
          icon: globeIcon
        }} options={worldFilters} />
      </div>

      { showNewVenueModal &&
        <Modal className="new-venue-modal" onStageClick={_ => setShowNewVenueModal(false) }>
          <button className="venue-modal__close-button" onClick={_ => setShowNewVenueModal(false) }>
            <img src={crossIcon} alt="" />
          </button>
          <NewVenueGuidance />
        </Modal>
      }
    </>
  )
}