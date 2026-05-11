import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CatAvatar from "./components/CatAvatar";
import HomePage from "./pages/HomePage";
import LessonPage from "./pages/LessonPage";
import SQLTranslator from "./pages/SQLTranslator";
import SummaryPage from "./pages/SummaryPage";
import PracticePage from "./pages/PracticePage";
import { chapterLessons } from "./data/lessons";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LessonPage />} />
            <Route path="/learn/:chapterId" element={<LessonPage />} />
            <Route path="/translator" element={<SQLTranslator />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/practice" element={<PracticePage />} />
          </Routes>
        </main>
        <CatAvatar />
      </div>
    </Router>
  );
}
