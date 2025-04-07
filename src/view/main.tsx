import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/signin';

const root = createRoot(document.body);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn />}></Route>
        </Routes>
    </BrowserRouter>
);