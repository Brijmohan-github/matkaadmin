import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Game from "./pages/Game";
import DashBoard from "./pages/DashBoard";
import Users from "./pages/Users";
import Recharge from "./pages/Recharge";
import Withdraw from "./pages/Withdraw";
import Settings from "./pages/Settings";
import Bets from "./pages/Bet";
import ErrorPage from "./pages/ErrorPage";
import GameControl from "./pages/GameControl";
import Bank from "./pages/Bank";
import UserDetail from "./pages/UserDetail";
import Notice from "./pages/Notice";
import { Login } from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import DeclareResult from "./pages/DeclareResult";
import Slider from "./pages/Slider";
import Privacy from "./pages/Privacy";
import DelhiGames from "./pages/DelhiGames";
import DeleteAccount from "./pages/DeleteAccount";
import StarlineResult from "./pages/StarlineResult";
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/datadeletion" element={<DeleteAccount />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="game" element={<Game />} />
          <Route path="users" element={<Users />} />
          <Route path="recharge" element={<Recharge />} />
          <Route path="withdraw" element={<Withdraw />} />
          <Route path="bets" element={<Bets />} />
          <Route path="settings" element={<Settings />} />
          <Route path="changepassword" element={<ChangePassword />} />
          {/* <Route path="selfgame" element={<SelfGame />} />
        <Route path="marketgame" element={<MarketGame />} /> */}
          <Route path="delhigames" element={<DelhiGames />} />
          <Route path="starline" element={<StarlineResult />} />
          <Route path="gamecontrol/:id" element={<GameControl />} />
          <Route path="userdetail/:id" element={<UserDetail />} />
          <Route path="bank" element={<Bank />} />
          <Route path="notice" element={<Notice />} />
          <Route path="declareresult" element={<DeclareResult />} />
          <Route path="slider" element={<Slider />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
