import "./textbox.css";

export function TextBox(props) {
  return <div className={"textbox__container " + props.className}>
    <img src={props.icon} alt="" />
    <input type="textbox" placeholder={props.label} aria-label={props.label}/>
  </div>;
}