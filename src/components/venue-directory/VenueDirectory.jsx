import React, {useEffect, useState} from "react";
import {VenueCollection} from "../venue-strip/VenueCollection";
import {venueService} from "../../services/venues/venueService";
import {favouritesService} from "../../services/favouritesService";
import {timeService} from "../../services/timeService";
import React, {Profiler} from "react";
import { useEffect, useState } from "react";
import { VenueFiltersPanel } from "./VenueFiltersPanel";
import { venueService } from "../../services/venueService";
import { favouritesService } from "../../services/favouritesService";
import { timeService } from "../../services/timeService";
import { VenueStrip } from "../venue-strip/VenueStrip";
import days from "../../consts/days.json";
import "./venue-directory.css"

const isLoadedButNoResult = (venues) => 
  venues !== undefined && venues !== null && venues.length === 0;

const isLoadingOrLoadedWithResults = (venues) => !isLoadedButNoResult(venues);

export function VenueDirectory(props) {

  // venue states
  const [ venues, setVenues ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(_ => {
    (async () => {
      try {
        setVenues(await venueService.getVenueSchedule());
      } catch (e) {
        setError(e);
      }
    })();
  }, [ ]);

  useEffect(_ => {
    (async () => {
      return favouritesService.observe(async _ => setVenues(await venueService.getVenueSchedule()));
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
      filteredFuture,
      filteredUnscheduled;

  if (venues !== null) {
    filteredFavorites = filter(venues.favourites);
    filteredOpen = filter(venues.open);
    filteredNewest = filter(venues.newest).sort((a, b) => ((b.added && new Date(b.added)) || 0) - ((a.added && new Date(a.added)) || 0))
    filteredFuture = filter(venues.future);
    filteredUnscheduled = filter(venues.unscheduled);
  }

  const scheduledVenuesRender = [];
  const currentDay = timeService.getLocalDay();
  for (let i = currentDay, looped = false; !looped || i !== currentDay; (looped = true) && (i = ++i % 7)) {
    let filteredScheduled;
    if (venues !== null)
      filteredScheduled = filter(venues.scheduled[i]);
    if (isLoadedButNoResult(filteredScheduled))
      continue;

    scheduledVenuesRender.push(
      <div className="venue-directory__list-section venue-directory__list-section-day" key={i}>
        <h2>{currentDay === i ? `Today (${days[i]})` : currentDay === i - 1 ? `Tomorrow (${days[i]})` : days[i]}</h2>
        <VenueCollection className="venue-directory__list" venues={filteredScheduled} />
      </div>
    )
  }

  if (error)
    return <>
      {filterPanel}
      <div className="venue-directory__none-found">
        😱 We couldn't load the venues! {error.message}
      </div>
    </>

  if (!scheduledVenuesRender && isLoadedButNoResult(filteredUnscheduled))
    return <>
      {filterPanel}
      <div className="venue-directory__none-found">
        😞 No results for that search or combination of tags.
      </div>
    </>

  return <Profiler id="VenueDirectory" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>

    <div className={"venue-directory__container " + props.className}>
      { isLoadedButNoResult(filteredUnscheduled) && scheduledVenuesRender.length === 0 &&
          <div className="venue-directory__none-found">
            We're sowwy. 😞 <strong>We didn't find any venues for that search or combination of tags.</strong> <br/>We're indexing hundreds of venues per month! So, check back later or ask the community in <a href="https://discord.gg/gTP65VYcMj">our discord</a>!
          </div>
      }

    { /* Favorites */ }
    { isLoadingOrLoadedWithResults(filteredFavorites) &&
      <Profiler id="venue-directory__favourites" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="venue-directory__list-section venue-directory__list-section-favorites">
          <h2>Favorites</h2>
          <VenueCollection className="venue-directory__list" venues={filteredFavorites} />
        </div>
      </Profiler> }

    { /* Open */ }
    { isLoadingOrLoadedWithResults(filteredOpen) &&
      <Profiler id="venue-directory__open" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="venue-directory__list-section venue-directory__list-section-opennow">
          <h2 className="venue-directory__list-heading--open-now">Open now</h2>
          <VenueCollection className="venue-directory__list" venues={filteredOpen} />
        </div>
      </Profiler>}

    { /* Newest */ }
    { isLoadingOrLoadedWithResults(filteredNewest) &&
      <Profiler id="venue-directory__new" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="venue-directory__list-section venue-directory__list-section-new">
          <h2>Newest</h2>
          <VenueCollection className="venue-directory__list" venues={filteredNewest} />
        </div>
      </Profiler>}

    { /* Scheduled */ }
    <Profiler id="venue-directory__scheduled" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
      { scheduledVenuesRender }
    </Profiler>

    { /* Future venues */ }
    { isLoadingOrLoadedWithResults(filteredFuture) &&
      <Profiler id="venue-directory__future" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>
        <div className="aether-venues__venues aether-venues__future-venues">
          <details open>
            <summary><h2>Future openings</h2></summary>
            { listView
              ? <VenueList venues={filteredFuture} />
              : <VenueStrip venues={filteredFuture} />
            }
          </details>
        </div>
      </Profiler>}

    { /* Unscheduled */ }
    { isLoadingOrLoadedWithResults(filteredUnscheduled) &&
      <Profiler id="venue-directory__unscheduled" onRender={(id, phase, duration) => console.log(`${id} rendered (${phase}) in ${duration}ms.`)}>

        <div className="venue-directory__list-section venue-directory__list-section-unscheduled">
          <h2>Unscheduled</h2>
          <VenueCollection className="venue-directory__list" venues={filteredUnscheduled} />
        </div>
      </Profiler>}

    </div>
  </Profiler>
}