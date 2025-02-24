import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Button from './Button';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataFetcher from './components/DataFetcher';

// Setup Redux Store
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

// Create React Query Client
const queryClient = new QueryClient();

// 🏠 Home Page
function Home() {
  return (
    <div>
      <Header title="สวัสดี React!"/>
      <h2>หน้าหลัก</h2>
      <p>ยินดีต้อนรับสู่การพัฒนาเว็บแอปด้วย React</p>
    </div>
  );
}

// ℹ️ About Page
function About() {
  return (
    <div>
      <Header title="React Workshop" />
      <p>เรียนรู้พื้นฐานของ React ผ่านการปฏิบัติจริง</p>
      <Button label="กดปุ่มนี้เพื่อรู้จักเรา" onClick={() => alert('เราชื่อ วรวรรรณ นะ!')} />
    </div>
  );
}

// 👤 Greeting Page
function Greeting(){
  return (
    <div>
      <Header title="Greeting new user!" />
      <p>ชื่อ: John Doe, อายุ: 25</p>
      <Button label="ตกลง" onClick={() => alert('สวัสดี John Doe!')} />
    </div>
  );
}

// 🛒 Counter Page using Redux
function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
    </div>
  );
}

function Store() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// 📡 Updated Data Page with Searchable Quotes
function DataPage() {
  return (
    <div>
      <Header title="📡 ค้นหาคำคม" />
      <DataFetcher />
    </div>
  );
}

// 🌎 Main App Component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav> 
          <Link to="/">Home</Link> | 
          <Link to="/about">About</Link> | 
          <Link to="/greeting">Greeting</Link> | 
          <Link to="/store">Store</Link> | 
          <Link to="/data">Quote Search</Link> 
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/greeting" element={<Greeting />} />
          <Route path="/store" element={<Store />} />
          <Route path="/data" element={<DataPage />} /> {/* 🔥 New Feature: Searchable Quotes */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
