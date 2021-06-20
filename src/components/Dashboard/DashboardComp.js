import React from 'react';

const DashboardComp = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log('current user=>', currentUser);
  return (
    <>
      <h2>User Dashboard</h2>
      <div className='card mb-3'>
        <h4 className='card-header'>User Information</h4>
        <ul className='list-group'>
          <li className='list-group-item'>Name : {currentUser.name} </li>
          <li className='list-group-item'>Email : {currentUser.email} </li>
          <li className='list-group-item'>
            Role :{' '}
            {currentUser.role !== 1
              ? currentUser.role === 2
                ? 'Customer'
                : 'Vendor'
              : 'Admin'}
          </li>

          <li className='list-group-item'>Gender : {currentUser.gender} </li>
          <li className='list-group-item'>Phone : {currentUser.phoneNumber}</li>
          <li className='list-group-item'>
            Temporary Address :{' '}
            {currentUser.address.tempAddress.length > 1
              ? currentUser.address.tempAddress.join(',')
              : currentUser.address.tempAddress}
          </li>
          <li className='list-group-item'>
            Permanent Address : {currentUser.address.permanentAddress}
          </li>
        </ul>
      </div>
      {currentUser.role !== 1 ? (
        <div className='card'>
          <h4 className='card-header'>Purchase History</h4>
          <ul className='list-group'>
            <li className='list-group-item'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUser.history.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default DashboardComp;
