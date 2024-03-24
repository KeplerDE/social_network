import { useContext } from "react"; 
import { UserContext } from "../context"; 

const Home = () => {
  const { state, setState } = useContext(UserContext); 

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="display-1 text-center">Home page</h1>
          {/* Отображение состояния в формате строки JSON */}
          <h5>{JSON.stringify(state)}</h5>
          <img src="/images/default.jpg" alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
