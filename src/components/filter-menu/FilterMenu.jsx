import React, { useState, useEffect } from 'react';
import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";

export function FilterMenu(props) {
  const [clear, setHeaderSelected] = useState(false);
  const [open, setOpen] = useState(-1); // todo when open (useEffect?) pass down a clear so it's always a fresh open
  const [activeOptions, setActiveOptions] = useState([]);
  const [activeStack, setActiveStack ] = useState(props.activeStack || -1);

  const key = props.stackKey === undefined ? 0 : props.stackKey;

  const style = { //todo move this to stylesheet

    ...props.style,
    active: {
      borderTopColor: "#E480FE",
      borderBottomColor: "#E480FE",
      background: "linear-gradient(90deg, #E480FE 0%, #D539FE 100%)",
      boxShadow: "#E480FE 0 0 3px",
      fontWeight: 600
    },
    li: {
      overflowClipBox: "content-box",
      ...props.style?.li,
    },
    itemControls: {
      marginBottom: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopStyle: "solid",
      borderBottomStyle: "solid",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      animation: ".2s slideInFromRight linear",
      ...props.style?.itemControls,

      leftIcon: {
        paddingTop: 6,
        paddingBottom: 6,
        width: 30,
        height: 16,
        textAlign: "right",
        ...props.style?.leftIcon
      },
      label: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        width: 140,
        ...props.style?.label
      },
      rightIcon: {
        paddingTop: 6,
        paddingBottom: 6,
        width: 30,
        textAlign: "left",
        height: 16,
        ...props.style?.rightIcon
      }
    },

  };


  const onClear = () => {
    setHeaderSelected(true);
    setActiveOptions([]);
    setActiveStack(key);
  }

  const onActivate = (o, i) => {
    let newActive = [ ...activeOptions ];
    newActive[i] = activeOptions[i] === undefined ? o.filter : undefined;
    setActiveOptions(newActive);
    const activeFilters = newActive.filter(f => f !== undefined);
    if (props.onFilter)
      props.onFilter({
        stackKey: key,
        filters: activeFilters,
      });
    if (activeFilters.length > 0)
      setActiveStack(key);
    setHeaderSelected(false);
  };

  const onChildActivate = (filterData) => {
    setActiveOptions([]);
    setActiveStack(filterData.stackKey);
    setHeaderSelected(false);
    if (props.onFilter) props.onFilter(filterData);
  };

  useEffect(() => {
    if (props.activeStack !== key) {
      setActiveOptions([]);
      setActiveStack(props.activeStack);
    }
  // eslint-disable-next-line
  }, [ props.activeStack ]);

  return (
      <ul style={style} className="filter-menu__container">
        {
          props.heading &&
          <li style={style.li}>
            <div style={clear ? { ...style.itemControls, ...style.active} : style.itemControls}>
              <div style={style.itemControls.leftIcon}>{ props.heading.icon && <img src={ props.heading.icon } alt="" /> }</div>
              <span className="name" style={style.itemControls.label} onClick={() => onClear()}>{props.heading.name}</span>
              <div style={style.itemControls.rightIcon}></div>
            </div>
          </li>
        }
        {props.options.map((option, i) => {
          if (open !== -1 && open !== i) // todo set clear key into own render/ outside map?
            return null;

          return <li key={option.name} style={style.li}>
            <div style={activeOptions[i] === undefined ? style.itemControls : { ...style.itemControls, ...style.active}}>
              <div style={style.itemControls.leftIcon}>{open === i && <img src={leftArrow} alt="Navigate Out Icon" onClick={() => setOpen(-1)}/>}</div>
              <span className="name" style={style.itemControls.label} onClick={() => onActivate(option, i)}>{option.name}</span>
              <div style={style.itemControls.rightIcon}>{open !== i && option.options && <img src={rightArrow} alt="Navigate In Icon" onClick={() => setOpen(i)}/>}</div>
            </div>
            {option.options &&
              <FilterMenu
                stackKey={key + "." + i}
                style={open !== i ? {...props.style, display: 'none'} : props.style}
                options={option.options}
                onFilter={onChildActivate}
                activeStack={activeStack}
              />
            }
          </li>
        })}
      </ul>
  );
}
