import React, { useEffect, useState } from 'react';
import { GetDeptHeadDashboardByDeptHead, GetSuperAdminDashboard, getAdminEmployeeDashByEmpId, getEmployeeDashByEmpId } from '../Service/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faQuestionCircle, faCheckCircle, faSpinner, faTimesCircle, faUsers, faBuilding } from '@fortawesome/free-solid-svg-icons';
import '../Other/Common.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState();
    const userInfoString = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userInfoString);

    useEffect(() => {
        if (userInfo.role === "Employee") {
            getEmployeeDashByEmpId(userInfo.employeeId).then((data) => {
                setDashboardData(data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        } else if (userInfo.role === "Department Head") {
            GetDeptHeadDashboardByDeptHead(userInfo.employeeId).then((data) => {
                setDashboardData(data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        } else if (userInfo.role === "Admin Department Employee") {
            getAdminEmployeeDashByEmpId(userInfo.employeeId).then((data) => {
                setDashboardData(data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        } else if (userInfo.role === "Super Admin") {
            GetSuperAdminDashboard(userInfo.employeeId).then((data) => {
                setDashboardData(data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    }, [userInfo.employeeId]);

    return (
        <div className='container'>
            <h1 className="custom-text m-3">Welcome To {userInfo.role} Dashboard </h1>
            <div className="d-flex">
                {dashboardData ? (
                    <>
                        {userInfo && (userInfo.role === "Super Admin") && <div className="card text-white bg-secondary m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Total Departments</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0"> {dashboardData.totalDepartments}</h2>
                                <FontAwesomeIcon icon={faBuilding} style={{ color: 'white', fontSize: '40px' }} />
                            </div>
                        </div>}
                        {userInfo && (userInfo.role === "Department Head"|| userInfo.role === "Super Admin") && <div className="card text-white bg-secondary m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Total Employees</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0"> {dashboardData.totalEmployees}</h2>
                                <FontAwesomeIcon icon={faUsers} style={{ color: 'white', fontSize: '40px' }} />
                            </div>
                        </div>}
                        <div className="card text-white bg-secondary m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Total Tickets</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0"> {dashboardData.totalTickets}</h2>
                                <FontAwesomeIcon icon={faTicketAlt} style={{ color: 'white', fontSize: '50px' }} />
                            </div>
                        </div>
                      {userInfo && (userInfo.role !== "Admin Department Employee") && <div className="card text-white bg-secondary m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Unassigned Tickets</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0"> {dashboardData.totalUnAssignedTickets}</h2>
                                <FontAwesomeIcon icon={faQuestionCircle} style={{ color: 'white', fontSize: '40px' }} />
                            </div>
                        </div>}
                        <div className="card text-white bg-secondary  m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Total Assigned Tickets</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0"> {dashboardData.totalAssignedTickets}</h2>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'white', fontSize: '40px' }} />
                            </div>
                        </div>
                        <div className="card text-white bg-secondary  m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Total In Progress Tickets</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0">  {dashboardData.totalInProgressTickets}</h2>
                                <FontAwesomeIcon icon={faSpinner} style={{ color: 'white', fontSize: '40px' }} />
                            </div>
                        </div>
                        <div className="card text-white bg-secondary  m-3 p-2" style={{ width: '18rem', border: '5px solid black' }}>
                            <div className="card-header"><h4>Total Closed Tickets</h4></div>
                            <div className="card-body d-flex justify-content-between">
                                <h2 className="card-title m-0">  {dashboardData.totalClosedTickets}</h2>
                                <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'white', fontSize: '40px' }} />
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
