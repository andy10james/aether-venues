import React from 'react';
import { ModalStage } from "./components/modal-stage/ModalStage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IndexPage } from "./pages/index-page/IndexPage";
import { Layout } from "./pages/Layout";
import { NotFoundPage } from "./pages/NotFoundPage";
import './App.css';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <ModalStage />
        <div className="aether-venues">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<IndexPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }

}

export { App };

