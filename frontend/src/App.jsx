import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import List from './pages/list';
import Article from './pages/article';
import Header from './components/header';
import './reset.scss';
import './index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container page-body">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<List />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<List />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
