import React, { useEffect, useState } from 'react';
import { CreateEmployee, DeleteEmployee, GetAllRoles, GetDepartments, GetEmployeeById, GetEmployees, UpdateEmployee } from '../Service/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faPlus, faTh, faSearch } from '@fortawesome/free-solid-svg-icons';
import myImage from '../images/loader.gif';

const Employee = () => {
    let [employeeslist, setEmployeeslist] = useState([])
    let [employeeObj, setEmployeeObj] = useState({
        "employeeId": 0,
        "employeeName": "",
        "contactNo": "",
        "emailId": "",
        "deptId": 0,
        "password": "",
        "gender": "",
        "role": ""
    })
    let [roles, setRoles] = useState([]);
    let [isLoader, setIsLoader] = useState(true);
    let [departmentlist, setDepartmentlist] = useState([]);
    useEffect(() => {
        GetEmployees().then((data) => {
            setEmployeeslist(data)
            setIsLoader(false);
        });
        GetEmployees();
        GetDepartments().then((data) => {
            setDepartmentlist(data)
        });
        GetDepartments();
        GetAllRoles().then((data) => {
            setRoles(data)
        });
        GetAllRoles();
    }, [])
    const changeEmployeeValue = (event, key) => {
        setEmployeeObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const toggleradio = (event) => {
        setEmployeeObj((prevObj) => ({ ...prevObj, gender: event.target.value }));
    };

    const reset = () => {
        setEmployeeObj({
            "employeeId": 0,
            "employeeName": "",
            "contactNo": "",
            "emailId": "",
            "deptId": 0,
            "password": "",
            "gender": "",
            "role": ""
        })
    }
    const handleCreateEmployee = async () => {
        try {
            const result = await CreateEmployee(employeeObj);
            if (result.result) {
                alert('Employee Created');
                const updatedEmployee = await GetEmployees();
                setEmployeeslist(updatedEmployee);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error creating Employee.');
        }
    };
    const onDeletehandle = async (employeeId) => {
        try {
            const result = await DeleteEmployee(employeeId);
            if (result.result) {
                alert('Employee deleted');
                const updatedEmployee = await GetEmployees();
                setEmployeeslist(updatedEmployee);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error deleting employee.');
        }
    }
    const onEdithandle = async (employeeId) => {
        try {
            const result = await GetEmployeeById(employeeId);
            setEmployeeObj(result);
            setFormstate(true);
        } catch (error) {
            alert('Error Occuored.');
        }
    }
    const updateEmployeeData = async () => {
        try {
            const result = await UpdateEmployee(employeeObj);
            if (result.result) {
                alert('employee updated');
                const updatedemployee = await GetEmployees();
                setEmployeeslist(updatedemployee);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error updating Employees');
        }
    }
    let [cardview, setCardview] = useState(false);
    const ShowCardView = () => {
        setCardview((prevCardview) => !prevCardview);
    };
    let [formstate, setFormstate] = useState(false);
    const ShowForm = () => {
        setFormstate((prevform) => !prevform);
    }

    const [searchValue, setSearchValue] = useState("");

    const SearchHandler = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
    
        const result = employeeslist.filter((item) => {
            for (let x in item) {
                if (item[x] && item[x].toString().toLowerCase().includes(value)) {
                    return true;
                }
            }
            return false;
        });
    
        setEmployeeslist(result);
    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                {formstate && <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-secondary text-white'>
                            <div className='row align-items-center'>
                                <div className='col-10'>
                                    <strong>New Employee</strong>
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
                                    <input type='text' value={employeeObj.employeeName} onChange={(event) => { changeEmployeeValue(event, 'employeeName') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Contact No</label>
                                    <input type='text' value={employeeObj.contactNo} onChange={(event) => { changeEmployeeValue(event, 'contactNo') }} className='form-control' />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label>Email Id</label>
                                    <input type='text' value={employeeObj.emailId} onChange={(event) => { changeEmployeeValue(event, 'emailId') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Department Name</label>
                                    <select className='form-select' value={employeeObj.deptId} onChange={(event) => { changeEmployeeValue(event, 'deptId') }}  >
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
                                <div className='col-6'>
                                    <label>Password</label>
                                    <input type='text' value={employeeObj.password} onChange={(event) => { changeEmployeeValue(event, 'password') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Gender</label>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="radio1"
                                                value="Male"
                                                onChange={toggleradio}
                                                checked={employeeObj.gender === "Male"}
                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>

                                        <div className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="radio2"
                                                value="Female"
                                                onChange={toggleradio}
                                                checked={employeeObj.gender === "Female"}
                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>

                                    </div>
                                </div>
                                {/* <div className='col-6'>
                                    <label>Gender</label>
                                    <input type='text' value={employeeObj.gender} onChange={(event) => { changeEmployeeValue(event, 'gender') }} className='form-control' />
                                </div> */}
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <label>Role</label>
                                    <select className='form-select' value={employeeObj.role} onChange={(event) => { changeEmployeeValue(event, 'role') }}  >
                                        <option>Select Role</option>
                                        {
                                            roles.map((item) => {
                                                return (<option value={item}>{item}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row pt-2'>
                                <div className='col-6 text-center'>
                                    <button className='btn btn-sm btn-success' onClick={reset}> Reset</button>
                                </div>
                                <div className='col-6 text-center'>
                                    {employeeObj.employeeId === 0 && <button className='btn btn-sm btn-success' onClick={handleCreateEmployee} disabled={
                                        employeeObj.employeeId === 0 &&
                                        (!employeeObj.employeeName ||
                                            !employeeObj.contactNo ||
                                            !employeeObj.emailId ||
                                            !employeeObj.deptId ||
                                            !employeeObj.password ||
                                            !employeeObj.gender ||
                                            !employeeObj.role)
                                    }> Create Employee</button>}
                                    {employeeObj.employeeId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateEmployeeData}> Update Employee</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className={formstate ? 'col-8' : 'col-12'}>
                    <div className='card'>
                        <div className='card-header bg-secondary  text-white row'>
                            <div className='col-7 text-center'> <strong> Employee List</strong></div>
                            <div class="search-container col-3">
                                <form >
                                    <input type="text" placeholder="Search.." name="search" value={searchValue} onChange={(e) => SearchHandler(e)} />
                                    <button type="submit"><FontAwesomeIcon icon={faSearch} style={{ color: 'black', fontSize: '22px' }} /></button>
                                </form>
                            </div>
                            <div className='col-1'>
                                <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faTh} onClick={ShowCardView} style={{ color: 'white', fontSize: '25px' }} /></div>
                            </div>
                            <div className='col-1'>
                                <div className="d-flex justify-content-end"><FontAwesomeIcon icon={faPlus} onClick={ShowForm} style={{ color: 'white', fontSize: '25px' }} /></div>
                            </div>
                        </div>

                        <div className='card-body'>
                            {!cardview && <table className='table table-bordered table-striped'>
                                <thead>
                                    <tr class="table-info">
                                        <th>Sr No</th>
                                        <th>Employee Name</th>
                                        <th>Department Name</th>
                                        <th>Contact No</th>
                                        <th>Email Id</th>
                                        <th>Role</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
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
                                        employeeslist && employeeslist.map((item, index) => {
                                            return (<tr>
                                                <td>{index + 1} </td>
                                                <td> {item.employeeName} </td>
                                                <td> {item.deptName}</td>
                                                <td> {item.contactNo}</td>
                                                <td> {item.emailId}</td>
                                                <td> {item.role}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-primary' onClick={() => { onEdithandle(item.employeeId) }} > <FontAwesomeIcon icon={faEdit} style={{ color: 'white', fontSize: '15px' }} /></button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-sm btn-danger' onClick={() => { onDeletehandle(item.employeeId) }}> <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '15px' }} /></button>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>}
                            </table>}
                            {cardview && (
                                <div className='row'>
                                    {employeeslist && employeeslist.map((item) => (
                                        <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }}>
                                            <div className="card-body bg-info">
                                                <h5 className="card-title">{item.employeeName}</h5>
                                                <p className="card-text">Department : {item.deptName}</p>
                                                <p className="card-text">Role : {item.role}</p>
                                                <p className="card-text">contact No : {item.contactNo}</p>
                                                <p className="card-text">emailId : {item.emailId}</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-end bg-secondary">
                                                <button className="btn btn-sm btn-primary me-2" onClick={() => { onEdithandle(item.employeeId) }}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => { onDeletehandle(item.employeeId) }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Employee;