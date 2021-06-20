import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Provider } from 'react-redux';

import { AppRouting } from './AppRouting';
import { store } from '../Redux/store';

const App = () => {
  // console.log('incoming data >>', args);
  // functional component must have return block
  return (
    <div>
      <Provider store={store}>
        <AppRouting />
      </Provider>
      <ToastContainer />
    </div>
  );
};

export default App;
