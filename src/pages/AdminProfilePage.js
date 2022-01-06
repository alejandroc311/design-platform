import { shallowEqual, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./../stylesheets/admin-page.css";
function AdminProfilePage(){
    const navigate = useNavigate();
    const admin = useSelector((state = {}) => state.adminSlice, shallowEqual);
    console.log(admin);
    let {id, proyects} = admin;
    const adminProyectsTableRow = proyects.map(({id, userEmail, userId, lastModified}) => {
        return(
            <tr key={userEmail}>
                <td>
                    {id}
                </td>
                <td>
                    {userId}
                </td>
                <td>
                    {userEmail}
                </td>
                <td>
                    {lastModified}
                </td>
                <td>
                    <button onClick={() => navigate(`${id}`)}>
                        See More
                    </button>
                </td>
            </tr>
        );
    })
    return(
        <div>
            <div id="admin-profile">
            <h1>Admin Profile</h1>
            <table className="proyects-table">
                <thead>
                <tr>
                    <th>
                        Proyect Id No.
                    </th>
                    <th>
                        Client Id No.
                    </th>
                    <th>
                        Client Email
                    </th>
                    <th>
                        Last Modified
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                    {adminProyectsTableRow}
                </tbody>
            </table>
            
        </div>
        <Outlet/>
        </div>
        
    );
}
export default AdminProfilePage