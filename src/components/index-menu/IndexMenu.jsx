import React, {useState} from "react";
import {Modal} from "../modal/Modal";
import {NewVenueGuidance} from "../new-venue-guidance/NewVenueGuidance";
import {FilterMenu} from "../filter-menu/FilterMenu";
import {TextBox} from "../textbox/textbox";
import {worldFilters} from "./filters/worldFilters";
import globeIcon from "../../assets/icons/globe-icon.svg";
import crossIcon from "../../assets/icons/cross.svg";
import settingsIcon from "../../assets/icons/settings-icon.svg";
import addIcon from "../../assets/icons/add-icon.svg";
import searchIcon from "../../assets/icons/search-icon.svg";
import logo from "../../assets/logos/logo.svg";
import tempAvatar from "./assets/avatar.jpg";
import "./index-menu.css";

export const IndexMenu = (props) => {
  const [showNewVenueModal, setShowNewVenueModal] = useState(false)

  return (
    <div className={"index-menu__container " + props.className}>

      <div className="index-menu__logo-container">
        <h1><img src={logo} alt="FFXIV Venues" /></h1>
      </div>

      <div className="index-menu__user-container">
        <div className="index-menu__user-detail">
          <img alt="" src={tempAvatar} className="index-menu__avatar" />
          <span className="index-menu__username">Kana Ki</span>
        </div>
        <img alt="Settings" src={settingsIcon} className="index-menu__settings-icon" />
      </div>

      <div className="index-menu__add-venue">
        <img alt="" src={addIcon} />
        <span>Add your venue</span>
      </div>

      <div className="index-menu__search-container">
        <TextBox className="index-menu__search" icon={searchIcon} label="Search venues" />
      </div>

      <FilterMenu heading={{
        name: "All regions",
        icon: globeIcon
      }} options={worldFilters} />

      { showNewVenueModal &&
        <Modal className="new-venue-modal" onStageClick={_ => setShowNewVenueModal(false) }>
          <button className="venue-modal__close-button" onClick={_ => setShowNewVenueModal(false) }>
            <img src={crossIcon} alt="" />
          </button>
          <NewVenueGuidance />
        </Modal>
      }
    </div>
  )
}