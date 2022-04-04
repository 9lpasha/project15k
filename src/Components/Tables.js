import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CompanyTable from "./CompanyTable";
import ObjectTable from "./ObjectTable";
import ContactTable from "./ContactTable";
import YuLiTable from "./YuLiTable";

function Tables() {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/tables/companies">
                        <CompanyTable></CompanyTable>
                    </Route>
                    <Route path="/tables/objects">
                        <ObjectTable></ObjectTable>
                    </Route>
                    <Route path="/tables/contacts">
                        <ContactTable></ContactTable>
                    </Route>
                    <Route path="/tables/yur">
                        <YuLiTable></YuLiTable>
                    </Route>
                    <Route path="/companies">
                        <YuLiTable></YuLiTable>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Tables;