import React, { memo, useEffect, useState } from 'react';
import { AssignRequest, CreateNewTicket, GetAssignedTicketsByEmpId, GetDepartments, GetEmployeesByDeptId, GetTicketsCreatedByEmpId, closeTicket, getNewTickets, startTicket } from '../Service/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTimes, faPlus, faCircle } from '@fortawesome/free-solid-svg-icons';

const Tickets = memo(() => {
    const userInfoString = localStorage.getItem('userinfo');
    const ticketstatuslist = ['Un-Assigned', 'Assigned', 'In-Progress', 'Closed'];
    const userInfo = JSON.parse(userInfoString);
    let [ticketslist, setTicketslist] = useState([])
    let [ticketsObj, setTicketsObj] = useState({
        "ticketId": 0,
        "employeeId": userInfo.employeeId,
        "severity": "",
        "deptId": 0,
        "state": "",
        "requestDetails": ""
    });
    let [assignticketobj, setAssignticketobj] = useState({
        "ticketId": 0,
        "assignedTo": 0
    })
    let [departmentlist, setDepartmentlist] = useState([]);
    let [deptemployee, setDeptemployee] = useState([])
    useEffect(() => {
        GetDepartments().then((data) => {
            setDepartmentlist(data)
        });
        if (userInfo.role === "Employee") {
            GetTicketsCreatedByEmpId(userInfo.employeeId).then((response) => {
                setTicketslist(response);
            });
        } else if (userInfo.role === "Department Head") {
            getNewTickets(userInfo.employeeId).then((response) => {
                setTicketslist(response);
            });
            GetEmployeesByDeptId(userInfo.deptId).then((response) => {
                setDeptemployee(response)
            });
        } else if (userInfo.role === "Admin Department Employee") {
            GetAssignedTicketsByEmpId(userInfo.employeeId).then((response) => {
                console.log(response);
                setTicketslist(response);
            });
        }
    }, []);

    const changeTicketValue = (event, key) => {
        setTicketsObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
    };
    // const changeAssignValue = (event, key) => {
    //     setAssignticketobj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    // }
    const changeAssignValue = (event, key, ticketId) => {
        setAssignticketobj(prevObj => ({ ...prevObj, [key]: event.target.value, ticketId: ticketId }));
    }

    const handleCreateTicket = async () => {
        try {
            const result = await CreateNewTicket(ticketsObj);
            if (result.result) {
                alert('Ticket Created');
                const updatedTickets = await GetTicketsCreatedByEmpId(userInfo.employeeId);
                setTicketslist(updatedTickets);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error creating Ticket.');
        }
    };
    const reset = () => {
        setTicketsObj({
            "employeeId": 0,
            "severity": "",
            "deptId": 0,
            "state": "",
            "requestDetails": ""
        })
    }
    // const handleAssingTicket = async () => {
    //     try {
    //         const result = await AssignRequest(assignticketobj);
    //         if (result.result) {
    //             alert('Ticket Asigned');
    //             const updatedTickets = await GetTicketsCreatedByEmpId(userInfo.employeeId);
    //             setTicketslist(updatedTickets);
    //         } else {
    //             alert(result.data.message);
    //         }
    //     } catch (error) {
    //         alert('Error creating Ticket.');
    //     }
    // }
    const handleAssingTicket = async () => {
        try {
            const result = await AssignRequest(assignticketobj);

            if (result.result) {
                alert('Ticket Assigned');
                const updatedTickets = ticketslist.filter(ticket => ticket.ticketId !== assignticketobj.ticketId);
                setTicketslist(updatedTickets);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            console.error('Error assigning ticket:', error);
            alert('Error assigning Ticket.');
        }
    };
    // const [ticketStatus, setTicketStatus] = useState({});
    const [ticketStatus, setTicketStatus] = useState(JSON.parse(localStorage.getItem('ticketStatus')) || {});
    const startTickethandle = async (ticketId) => {
        try {
            setTicketStatus((prevStatus) => ({
                ...prevStatus,
                [ticketId]: 'In Progress',
            }));
            await startTicket(ticketId);
            alert("Ticket start")
        } catch (error) {
            console.error('Error starting ticket:', error);
            alert('Error Occurred.');
        }
    };

    const closeTickethandle = async (ticketId) => {
        try {
            setTicketStatus((prevStatus) => ({
                ...prevStatus,
                [ticketId]: 'Closed',
            }));
            await closeTicket(ticketId);
            alert("Ticket closed")
        } catch (error) {
            alert('Error Occurred.');
        }
    };

    let [formstate, setFormstate] = useState(false);
    const ShowForm = () => {
        setFormstate((prevform) => !prevform);
    }
    useEffect(() => {
        localStorage.setItem('ticketStatus', JSON.stringify(ticketStatus));
    }, [ticketStatus]);
    return (
        <div className='container mt-4'>
            <div className='row'>
                {formstate && <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-secondary  text-white'>
                            <div className='row align-items-center'>
                                <div className='col-10'>
                                    <strong>New Ticket</strong>
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
                                    <label>severity</label>
                                    <select className='form-select' value={ticketsObj.severity} onChange={(event) => { changeTicketValue(event, 'severity') }}  >
                                        <option>Select severity</option>
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div className='col-6'>
                                    <label>Department Name</label>
                                    <select className='form-select' value={ticketsObj.deptId} onChange={(event) => { changeTicketValue(event, 'deptId') }}  >
                                        <option>Select Department Name</option>
                                        {
                                            departmentlist.map((item) => {
                                                return (<option value={item.deptId}>{item.deptName}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <label>Request Details</label>
                                    <textarea id="requestDetails" name="w3review" value={ticketsObj.requestDetails} onChange={(event) => { changeTicketValue(event, 'requestDetails') }} rows="4" cols="50"></textarea>
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                </div>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={handleCreateTicket} disabled={
                                        ticketsObj.severity === "" ||
                                        ticketsObj.deptId === 0 ||
                                        ticketsObj.requestDetails === ""
                                    } > Create Ticket</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className={formstate ? 'col-8' : 'col-12'}>
                    <div className='card'>
                        <div className='card-header bg-secondary  text-white row'>
                            <div className='col-10 text-center'> <strong> Tickets List</strong></div>
                            <div className='col-1'>
                                <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faPlus} onClick={ShowForm} style={{ color: 'white', fontSize: '25px' }} /></div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div></div>
                                {ticketslist && ticketslist.map((item) => (
                                    <div className="card col-md-4 m-3 p-2" style={{ width: '20rem',border: '1px solid black' }} key={item.ticketId}>
                                        <div className="card-body text-white bg-primary">
                                            <h5 className="card-title"><FontAwesomeIcon icon={faUser} style={{ color: 'white', fontSize: '20px' }} /> {item.ticketNo}</h5>
                                            <p className="card-text">Created Date: {item.createdDate.split('T')[0]}</p>
                                            <p className="card-text">Expected EndDate: {item.expectedEndDate.split('T')[0]}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {item.deptName && (
                                                <li className="list-group-item bg-info">Department Name: {item.deptName}</li>
                                            )}
                                            <li className="list-group-item bg-info">Severity: {item.severity}</li>
                                            {/* <li className="list-group-item bg-secondary text-white">Ticket-state: {item.state}</li> */}
                                            {userInfo.role === "Department Head" && (
                                                <li className="list-group-item bg-secondary text-white">
                                                    <select
                                                        className="form-select"
                                                        value={assignticketobj.assignedTo}
                                                        onChange={(event) => {
                                                            const ticketId = item.ticketId;
                                                            changeAssignValue(event, 'assignedTo', ticketId);
                                                        }}
                                                    >
                                                        <option value="">Assigned to</option>
                                                        {deptemployee.map((item) => (
                                                            <option key={item.employeeId} value={item.employeeId}>
                                                                {item.employeeName}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <button className='btn btn-sm btn-primary mt-3' onClick={handleAssingTicket} > Asign Ticket </button>
                                                </li>
                                            )}
                                            {userInfo.role === "Admin Department Employee" && item.state !== 'Closed' && (
                                                <li className="list-group-item bg-info">
                                                    {ticketStatus[item.ticketId] !== 'Closed' && ticketStatus[item.ticketId] !== 'In Progress' && (
                                                        <button
                                                            className='btn btn-sm btn-primary'
                                                            onClick={() => startTickethandle(item.ticketId)}
                                                        >
                                                            Start Ticket
                                                        </button>
                                                    )}

                                                    {ticketStatus[item.ticketId] === 'In Progress' && (
                                                        <button
                                                            className='btn btn-sm btn-danger'
                                                            onClick={() => closeTickethandle(item.ticketId)}
                                                        >
                                                            Close Ticket
                                                        </button>
                                                    )}
                                                </li>
                                            )}
                                            <li className="list-group-item">
                                                <div class="wrapper">
                                                    <ol class="ProgressBar">
                                                        {
                                                            ticketstatuslist.map((status) => {
                                                                return (
                                                                    <li class="ProgressBar-step">
                                                                        <FontAwesomeIcon icon={faCircle} className="ProgressBar-icon" style={status === 'Un-Assigned' ? { color: 'red' } : {}} />
                                                                        <span style={{ fontSize: '0.7em' }}>{status}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                        {/* <li class="ProgressBar-step">
                                                            <FontAwesomeIcon icon={faCircle} className="ProgressBar-icon" style={item.state === 'Un-Assigned' ? { color: 'red' } : {}} />
                                                            <span class="ProgressBar-stepLabel">Un-Assigned</span>
                                                        </li>
                                                        <li class="ProgressBar-step">
                                                            <FontAwesomeIcon icon={faCircle} className="ProgressBar-icon"  style={item.state === 'Assigned' ? { color: 'red' } : {}}/>
                                                            <span class="ProgressBar-stepLabel">Assigned</span>
                                                        </li>
                                                        <li class="ProgressBar-step">
                                                            <FontAwesomeIcon icon={faCircle} className="ProgressBar-icon" style={item.state === 'In Progress' ? { color: 'red' } : {}} />
                                                            <span class="ProgressBar-stepLabel">In Progress</span>
                                                        </li>
                                                        <li class="ProgressBar-step">
                                                            <FontAwesomeIcon icon={faCircle} className="ProgressBar-icon" style={item.state === 'Closed' ? { color: 'red' } : {}} />
                                                            <span class="ProgressBar-stepLabel">Closed</span>
                                                        </li> */}
                                                    </ol>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
});

export default Tickets;