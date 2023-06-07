import React from 'react';

const AdminTableRow = ({user}) => {




    return (

            <tr>

                <td>
                    <div className="flex items-center space-x-3">

                        <div>
                            <div className="font-bold">{user.name||'no name found'}</div>
                        </div>
                    </div>
                </td>
                <td>

                    
                    <span className="font-bold">{user.email }</span>
                </td>
                <td className="font-bold">{user.role}</td>
                <th>
                    <button className="btn btn-primary btn-xs">make admin</button>
                </th>
                <th>
                    <button className="btn btn-primary btn-xs">make instructor</button>
                </th>
            </tr>


    );
};

export default AdminTableRow;