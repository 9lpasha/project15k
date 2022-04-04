import './App.css';
import {Switch, Route, BrowserRouter as Router} from "react-router-dom";
import Tables from "./Components/Tables";
import Companies from "./Components/Companies";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    return (
        <div className="App">
            <Router>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">Таблицы</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/tables/companies">Компании</Nav.Link>
                            <Nav.Link href="/tables/objects">Объекты</Nav.Link>
                            <Nav.Link href="/tables/contacts">Контакты</Nav.Link>
                            <Nav.Link href="/tables/yur">Юр. лица</Nav.Link>
                        </Nav>
                        <Navbar.Brand href="/companies">Формы</Navbar.Brand>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/tables">
                        <Tables></Tables>
                    </Route>
                    <Route path="/companies">
                        <Companies></Companies>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
