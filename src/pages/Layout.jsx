import {Outlet} from "react-router-dom";
import {Notice} from "../components/notice/Notice";

export const Layout = () => {
  return <>
    <Notice />
    <Outlet />
  </>
}