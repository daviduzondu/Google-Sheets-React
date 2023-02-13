import logo from './logo.svg';
import Homepage from './Pages/Homepage';
import Blogpage from './Pages/Blogpage';
import PostNotFound from './Pages/PostNotFound'
import FindPage from './Pages/FindPage';
import { Route, Routes, useLocation, Link } from 'react-router-dom';

function App() {
  const location = useLocation();
  console.log(location.pathname)

  return (
    <div className="App">
      {location.pathname !== "/" &&
        <nav>
          <Link to={"/"}>
            <div className='home'>
              <span>🏠 Take me Home</span>
            </div>
          </Link></nav>}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts/:id" element={<Blogpage />} />
        <Route path="/tags/:tag" element={<FindPage />} />
        <Route path="*" element={<PostNotFound />} />
      </Routes> 

    </div>
  );
}

export default App;
