import { Provider } from "react-redux";
import DataList from "@configRedux/dinamisRedux/DataList";
import store from "@configRedux/dinamisRedux/store";

const AppTest: React.FC = () => {
    return (
      <Provider store={store}>
        <DataList/>
      </Provider>
    );
  }
  
  
  export default AppTest;