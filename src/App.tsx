import "antd/dist/antd.css";
import "./App.scss";
import { Leadership } from "./routers/routerLeadership";
import "./shared/styles/styles.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Leadership />
    </div>
  );
};
  
export default App;
