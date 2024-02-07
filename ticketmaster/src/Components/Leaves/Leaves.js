import React, { memo, useEffect, useState } from 'react';
import myImage from '../images/loader.gif';
import { AddLeave, GetAllLeaves, GetEmployees } from '../Service/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const Leaves = memo(() => {
    let [leaveslist, setLeaveslist] = useState([])
    let [isLoader, setIsLoader] = useState(true);
    let [employeeslist, setEmployeeslist] = useState([])
    let [leaveObj, setLeaveObj] = useState({
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

    useEffect(() => {
        GetAllLeaves().then((data) => {
            setLeaveslist(data)
            setIsLoader(false);
        });
        GetEmployees().then((data) => {
            setEmployeeslist(data)
        });
    }, [])
    const changeLeaveValue = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const changeLeaveCheckbox = (event, key) => {
        setLeaveObj(prevObj => ({ ...prevObj, [key]: event.target.checked }))
    }
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
    const updateLeaves = async () => {
        // try {
        //     const result = await UpdateEmployee(employeeObj);
        //     if (result.result) {
        //         alert('employee updated');
        //         const updatedemployee = await GetEmployees();
        //         setEmployeeslist(updatedemployee);
        //     } else {
        //         alert(result.data.message);
        //     }
        // } catch (error) {
        //     alert('Error updating Employees');
        // }
    }
    const onEdithandle = async (leaveId) => {
        // try {
        //     const result = await GetEmployeeById(employeeId);
        //     setEmployeeObj(result);
        //     setFormstate(true);
        // } catch (error) {
        //     alert('Error Occuored.');
        // }
    }
    let [formstate, setFormstate] = useState(false);
    const ShowForm = () => {
        setFormstate((prevform) => !prevform);
    }
    return (
        <div className='container mt-4'>
            <div className='row'>
                {formstate &&
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header bg-secondary text-white'>
                                <div className='row align-items-center'>
                                    <div className='col-10'>
                                        <strong>Add Leaves </strong>
                                    </div>
                                    <div className='col-2'>
                                        <div className="d-flex justify-content-end">
                                            <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '25px' }} onClick={ShowForm} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body' style={{ backgroundColor: '#d6d6d6' }}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>Employee Name</label>
                                        <select className='form-select' value={leaveObj.employeeId} onChange={(event) => { changeLeaveValue(event, 'employeeId') }}  >
                                            <option>Select Employee Name</option>
                                            {
                                                employeeslist.map((item) => {
                                                    return (<option value={item.employeeId}>{item.employeeName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-6'>
                                        <label>fromDate</label>
                                        <input type='date' value={leaveObj.fromDate} onChange={(event) => { changeLeaveValue(event, 'fromDate') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <label>toDate</label>
                                        <input type='date' value={leaveObj.toDate} onChange={(event) => { changeLeaveValue(event, 'toDate') }} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <label>noOfDays</label>
                                        <input type='number' value={leaveObj.noOfDays} onChange={(event) => { changeLeaveValue(event, 'noOfDays') }} className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
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
                                    <div className='col-6'>
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
                                        {leaveObj.leaveId !== 0 && (
                                            <button className='btn btn-sm btn-warning' onClick={updateLeaves}>
                                                Update Leaves
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>}
                <div className={formstate ? 'col-8' : 'col-12'}>
                    <div className='card'>
                        <div className='card-header bg-secondary  text-white row'>
                            <div className='col-10 text-center'> <strong> Leaves</strong></div>
                            <div className='col-1'>
                                <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faPlus} onClick={ShowForm} style={{ color: 'white', fontSize: '25px' }} /></div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr class="table-info">
                                        <th>Sr No</th>
                                        <th>Employee Name</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>No Of Days</th>
                                        <th>Leave Type</th>
                                        <th>Approved Date</th>
                                        <th>IsApproved</th>
                                        {/* <th>Edit</th>
                                        <th>Delete</th> */}
                                    </tr>
                                </thead>
                                {
                                    isLoader && <tbody>
                                        <tr>
                                            <td colSpan='6' className="text-center">
                                                <img src={myImage} />
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                                {!isLoader && <tbody>
                                    {
                                        leaveslist && leaveslist.map((item, index) => {
                                            return (<tr>
                                                <td>{index + 1} </td>
                                                <td> {item.employeeName} </td>
                                                <td>{item.fromDate.split('T')[0]}</td>
                                                <td>{item.toDate.split('T')[0]}</td>
                                                <td> {item.noOfDays}</td>
                                                <td> {item.leaveType}</td>
                                                <td> {item.approvedDate && item.approvedDate.split('T')[0]}</td>
                                                <td>{item.isApproved ? 'Yes' : 'No'}</td>
                                                {/* <td>
                                                    <button className='btn btn-sm btn-primary' onClick={() => { onEdithandle(item.leaveId) }}  > <FontAwesomeIcon icon={faEdit} style={{ color: 'white', fontSize: '15px' }} /></button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-sm btn-danger'> <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '15px' }} /></button>
                                                </td> */}
                                            </tr>)
                                        })
                                    }
                                </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Leaves;