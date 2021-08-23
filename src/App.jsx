import React from 'react';
import './App.css';
import { VenueOpening } from "./components/venue-opening/VenueOpening";
import { ModalStage } from "./components/modal-stage/ModalStage";
import { Notice } from './components/notice/notice';
import venues from "./venues.json";
import days from "./consts/days.json"

class App extends React.Component {

  constructor() {
    super();
    this._currentDay = new Date().getUTCHours() < 9 ? new Date().getUTCDay() - 2 : new Date().getUTCDay() - 1;
    if (this._currentDay < 0) this._currentDay += 7;
    this._venueViewModels = this._getVenueViewModels();
  }

  _getVenueViewModels() {
    let venueViewModels = [[], [], [], [], [], [], []];
  
    for (const venue of venues) {
      for (const time of venue.times) {
        const venueViewModel = {
          venue,
          time
        };
        const position = time.day - this._currentDay < 0 ? time.day - this._currentDay + 7 : time.day - this._currentDay;
        venueViewModels[position].push(venueViewModel);
      }
    }
  
    venueViewModels = venueViewModels.map(day => day.sort((a, b) => {
      let aStartTime = (a.time.start.hour * 100) + a.time.start.minute;
      if (a.time.start.nextDay) aStartTime += 2400;
      let bStartTime = (b.time.start.hour * 100) + b.time.start.minute;
      if (b.time.start.nextDay) bStartTime += 2400;
      return aStartTime - bStartTime;
    }));

    return venueViewModels;
  }
  

  render() {
    return (
      <React.Fragment>
        <ModalStage />
        <div className={"aether-venues"}>
          <div className="aether-venues__banner-credit">
            Photograph by <a target="_blank" rel="noreferrer" href="https://here-xumm.carrd.co/">Here Xumm</a>, Siren.
          </div>
          <div className="aether-venues__heading">
            <img src="logo.png" alt="" />
            <h1>Aether Venues</h1>
          </div>
          <p className="aether-venues__definition">
            A venue is a place maintained by players for all RPers to come by and RP in. This includes taverns, shops, nightclubs, restaurants or even crazier environments like colosseums. They often include various RP "services" such as in-house photography, artists, tarrot readings and courtesans. Venues must have a regularly scheduled opening time to be on this list. 
          </p>  
          <div className="aether-venues__venues">
            { this._venueViewModels.map((venues, i) => {

              return (<div className="aether-venues__day" key={i}>
                <details open>
                  <summary><h2>{days[i + this._currentDay > 6 ? i + this._currentDay - 7 : i + this._currentDay ]}</h2></summary>
                  { venues.map((v, i) => <VenueOpening {...v} key={i} /> )}
                </details>
              </div>);
            }
               
            )}
          </div>
          <div className="aether-venues__made-by">Made with <span>♥</span> by <a target="_blank" rel="noreferrer" href="https://discordapp.com/users/236852510688542720">Kana Ki</a>, Gilgamesh.</div>
        </div>
      </React.Fragment>
    );
  }

}

export { App };
