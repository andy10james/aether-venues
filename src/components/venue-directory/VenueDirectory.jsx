import React, {useEffect, useState} from "react";
import {VenueCollection} from "../venue-strip/VenueCollection";
import {venueService} from "../../services/venues/venueService";
import {favouritesService} from "../../services/favouritesService";
import {timeService} from "../../services/timeService";
import days from "../../consts/days.json";
import "./venue-directory.css"

const isLoadedButNoResult = (venues) => 
  venues !== undefined && venues !== null && venues.length === 0;

const isLoadingOrLoadedWithResults = (venues) => !isLoadedButNoResult(venues);

export function VenueDirectory(props) {

  // venue states
  const [ favorites, setFavorites ] = useState(null);
  const [ open, setOpen ] = useState(null);
  const [ newest, setNewest ] = useState(null);
  const [ scheduled, setScheduled ] = useState(null);

  useEffect(_ => {
    (async () => {
      const venues = await venueService.getVenues();
      setFavorites(venues.filter(v => v.isFavorite()));
      setNewest(venues.filter(v => v.isNew()));
      const openVenues = await venueService.getOpenVenues();
      setOpen(openVenues);
      const scheduledVenues = await venueService.getVenueSchedule();
      setScheduled(scheduledVenues);
    })();
  }, [ ]);

  useEffect(_ => {
    (async () => {
      return favouritesService.observe(async _ =>
        setFavorites((await venueService.getVenues()).filter(v => v.isFavorite())));
    })()
  }, []);

  const filter = (venues) => {
    if (venues === null) return null;
    let currentVenues = venues;
    if (props.filters)
      currentVenues.filter(v => props.filters.every(f => f(v)))
    return currentVenues;
  }

  let filteredFavorites, 
      filteredOpen,
      filteredNewest,
      filteredUnscheduled,
      scheduledVenuesRender;

  if (favorites !== null) {
    filteredFavorites = filter(favorites);
  }

  if (open !== null) {
    filteredOpen = filter(open);
  }

  if (newest !== null) {
    filteredNewest = filter(newest).sort((a, b) => ((b.added && new Date(b.added)) || 0) - ((a.added && new Date(a.added)) || 0))
  }

  if (scheduled !== null) {
    filteredUnscheduled = filter(scheduled.unscheduled);
  }

  scheduledVenuesRender = [];
  const currentDay = timeService.getLocalDay();
  for (let i = currentDay, looped = false; !looped || i !== currentDay; (looped = true) && (i = ++i % 7)) {
    let filteredScheduled;
    if (scheduled !== null)
      filteredScheduled = filter(scheduled.scheduled[i]);
    if (isLoadedButNoResult(filteredScheduled))
      continue;

    scheduledVenuesRender.push(
      <div className="venue-directory__list-section venue-directory__list-section-day" key={i}>
        <h2>{currentDay === i ? `Today (${days[i]})` : currentDay === i - 1 ? `Tomorrow (${days[i]})` : days[i]}</h2>
        <VenueCollection className="venue-directory__list" venues={filteredScheduled} />
      </div>
    )
  }

  return <div className={"venue-directory__container " + props.className}>
    { isLoadedButNoResult(filteredUnscheduled) && scheduledVenuesRender.length === 0 &&
        <div className="venue-directory__none-found">
          We're sowwy. 😞 <strong>We didn't find any venues for that search or combination of tags.</strong> <br/>We're indexing hundreds of venues per month! So, check back later or ask the community in <a href="https://discord.gg/gTP65VYcMj">our discord</a>!
        </div>
    }
    
    { /* Favorites */ }
    { isLoadingOrLoadedWithResults(filteredFavorites) && 
    <div className="venue-directory__list-section venue-directory__list-section-favorites">
      <h2>Favorites</h2>
      <VenueCollection className="venue-directory__list" venues={filteredFavorites} />
    </div> }

    { /* Open */ }
    { isLoadingOrLoadedWithResults(filteredOpen) && 
    <div className="venue-directory__list-section venue-directory__list-section-opennow">
      <h2 className="venue-directory__list-heading--open-now">Open now</h2>
      <VenueCollection className="venue-directory__list" venues={filteredOpen} />
    </div> }

    { /* Newest */ }
    { isLoadingOrLoadedWithResults(filteredNewest) && 
    <div className="venue-directory__list-section venue-directory__list-section-new">
      <h2>Newest</h2>
      <VenueCollection className="venue-directory__list" venues={filteredNewest} />
    </div> }

    { /* Scheduled */ }
    { scheduledVenuesRender }

    { /* Unscheduled */ }
    { isLoadingOrLoadedWithResults(filteredUnscheduled) && 
    <div className="venue-directory__list-section venue-directory__list-section-unscheduled">
      <h2>Unscheduled</h2>
      <VenueCollection className="venue-directory__list" venues={filteredUnscheduled} />
    </div> }
  </div>
}