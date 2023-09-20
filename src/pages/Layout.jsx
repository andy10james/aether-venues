import {Outlet} from "react-router-dom";
import {Notice} from "../components/notice/notice";

export const Layout = () => {
  return <>
    <Notice />
    <Outlet />
  </>
}