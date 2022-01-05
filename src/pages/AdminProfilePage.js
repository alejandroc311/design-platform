import "./../stylesheets/admin-page.css"
function AdminProfilePage(){
    //const proyectItems = proyects.map(({id, userId, adminId, lastModified, email}) => {
      //  return(
        //    <div className="proyect-item">
          //      <div></div>
            //</div>
        //);
   //    })
    return(
        <div id="admin-profile">
            <h1>Admin Profile</h1>
            <table className="proyects-table">
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
                </tr>
            </table>
        </div>
    );
}
export default AdminProfilePage