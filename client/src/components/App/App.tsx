import { ToastContainer } from "react-toastify";
import Form from "../Form/Form";
import List from "../List/List";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
    return (
        <>
            <Form title="ToDo App" />
            <List />
            <ToastContainer />
        </>
    );
};

export default App;
