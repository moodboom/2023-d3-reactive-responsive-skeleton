import './App.scss'
import { Routes, Route } from "react-router-dom";
import { SpaLayout } from './SpaLayout'
import { ChartPage } from './ChartPage'
import { About } from './About'

const App = () => {
  return (
    <Routes>
      {/* sync with SpaLayout navbar*/}
      <Route path="/" element={<SpaLayout />}>
        <Route index element={<ChartPage />} />
        <Route path="about" element={<About />} />
        {/* default */}
        <Route path="*" element={<ChartPage />} />
      </Route>
    </Routes>
  );
}

export default App
