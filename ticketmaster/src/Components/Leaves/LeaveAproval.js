import React, { useEffect, useState } from 'react';
import { AddLeave, ApproveLeave, GetAllLeaves, GetAllLeavesByEmployeeId, GetEmployees, GetLeavesForApprovalBySuperwiserId, RejectLeave } from '../Service/Service';

const LeaveAproval = () => {
    const userInfoString = localStorage.getItem('userinfo');
    const userInfo = JSON.parse(userInfoString);
    const [aproveleve, setAproveleve] = useState();
    let [leaveslist, setLeaveslist] = useState([])
    let [leaveObj, setLeaveObj] = useState({
        "leaveId": 0,
        "employeeId": userInfo.employeeId,
        "fromDate": "2024-01-27T09:03:45.028Z",
        "toDate": "2024-01-27T09:03:45.028Z",
        "noOfDays": 0,
        "leaveType": "",
        "details": "",
        "isApproved": false,
        "approvedDate": null
    })
    const changeLeaveValue = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const changeLeaveCheckbox = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }
    useEffect(() => {
        if (userInfo.role === "Department Head") {
            GetLeavesForApprovalBySuperwiserId(userInfo.employeeId).then((data) => {
                setAproveleve(data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        } else if (userInfo.role === "Employee") {
            GetAllLeavesByEmployeeId(userInfo.employeeId).then((data) => {
                setAproveleve(data);
            }).catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    }, [])
    const ApproveLeaveHandle = async (leaveId) => {
        try {
            await ApproveLeave(leaveId);
            setAproveleve(prevLeaves => prevLeaves.filter(leave => leave.leaveId !== leaveId));
        } catch (error) {
            console.error('Error approving leave:', error);
        }
    };

    const RejectLeaveHandle = async (leaveId) => {
        try {
            await RejectLeave(leaveId);
            alert("Leave Rejected");
            setAproveleve(prevLeaves => prevLeaves.filter(leave => leave.leaveId !== leaveId));
        } catch (error) {
            console.error('Error rejecting leave:', error);
        }
    };

    const handleAddLeaves = async () => {
        try {
            const result = await AddLeave(leaveObj);
            if (result.result) {
                alert('Leave added');
                const updatedleave = await GetAllLeaves();
                setLeaveslist(updatedleave);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error adding leave.');
        }
    };
    const reset = () => {
        setLeaveObj({
            "leaveId": 0,
            "employeeId": 0,
            "fromDate": "2024-01-27T09:03:45.028Z",
            "toDate": "2024-01-27T09:03:45.028Z",
            "noOfDays": 0,
            "leaveType": "",
            "details": "",
            "isApproved": false,
            "approvedDate": null
        })
    }

    return (
        <div className='container mt-4' >
            <div className='row'>
                <div className='col-8'>
                    <div className='card'>
                        <div className='card-header bg-secondary text-white'>
                            Leaves
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {aproveleve && aproveleve.map((item, index) => {
                                return (
                                    <div key={index} className="card m-3 p-2" style={{ width: '20rem', border: '1px solid black' }}>
                                        <div className="card-body" style={{ backgroundColor: '#f8ecec' }}>
                                            <h5 className="card-title">Employee Name: {item.employeeName}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Leave Type: {item.leaveType}</h6>
                                            <p className="card-text">From Date: {item.fromDate.split('T')[0]}</p>
                                            <p className="card-text">To Date: {item.toDate.split('T')[0]}</p>
                                            <p className="card-text">No Of Days: {item.noOfDays}</p>
                                            {userInfo && (userInfo.role === "Department Head") &&
                                                <>
                                                    <button className='btn btn-sm btn-primary' style={{ margin: '10px' }} onClick={() => { ApproveLeaveHandle(item.leaveId) }}>Approve</button>
                                                    <button className='btn btn-sm btn-danger' style={{ margin: '10px' }} onClick={() => { RejectLeaveHandle(item.leaveId) }}>Reject</button>
                                                </>
                                            }
                                            {userInfo && (userInfo.role === "Employee") &&
                                                <p>Status: {item.isApproved ? 'Approved' : item.isApproved === false ? 'Rejected' : 'Pending'}</p>
                                            }
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-secondary text-white'>
                            <div className='row align-items-center'>
                                <strong>Add Leaves </strong>
                            </div>
                        </div>
                        <div className='card-body' style={{ backgroundColor: '#d6d6d6' }}>
                            <div className='row'>                             
                                <div className='col-6'>
                                    <label>fromDate</label>
                                    <input type='date' value={leaveObj.fromDate} onChange={(event) => { changeLeaveValue(event, 'fromDate') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>toDate</label>
                                    <input type='date' value={leaveObj.toDate} onChange={(event) => { changeLeaveValue(event, 'toDate') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row'>
                            <div className='col-6'>
                                    <label>noOfDays</label>
                                    <input type='number' value={leaveObj.noOfDays} onChange={(event) => { changeLeaveValue(event, 'noOfDays') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>leaveType</label>
                                    {/* <input type='text' value={leaveObj.leaveType} onChange={(event) => { changeLeaveValue(event, 'leaveType') }} className='rolesform-control' /> */}
                                    <select className='form-select' value={leaveObj.leaveType} onChange={(event) => { changeLeaveValue(event, 'leaveType') }}>
                                        <option>select leave type</option>
                                        <option>Casual Leave</option>
                                        <option>Sick Leave</option>
                                        <option>Privileged leave</option>
                                        <option>Maternity leave</option>
                                        <option>Paternity leave</option>
                                        <option>Religious festival leaves</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row'>                               
                                <div className='col-12'>
                                    <label>details</label>
                                    <textarea
                                        rows="3"
                                        value={leaveObj.details}
                                        onChange={(event) => { changeLeaveValue(event, 'details') }}
                                        className='form-control'
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <input type='checkbox' checked={leaveObj.isApproved} onChange={(event) => { changeLeaveCheckbox(event, 'isApproved') }} id='fillId'  ></input>
                                    <label className='ms-2' htmlFor='fillId'>Is Approved</label>
                                </div>
                                <div className='col-6'>
                                    <label>approvedDate</label>
                                    <input type='date' value={leaveObj.approvedDate} onChange={(event) => { changeLeaveValue(event, 'approvedDate') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                </div>
                                <div className='col-6 text-center'>
                                    {leaveObj.leaveId === 0 && (
                                        <button className='btn btn-sm btn-success' onClick={handleAddLeaves} disabled={
                                            leaveObj.leaveId === 0 &&
                                            (!leaveObj.employeeId ||
                                                !leaveObj.fromDate ||
                                                !leaveObj.toDate ||
                                                !leaveObj.noOfDays ||
                                                !leaveObj.leaveType ||
                                                !leaveObj.details
                                            )
                                        }>
                                            Add Leaves
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LeaveAproval;