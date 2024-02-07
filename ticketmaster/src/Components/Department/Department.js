import React, { useEffect, useState } from 'react';
import { CreateDepartment, DeleteDepartment, GetDepartments, GetEmployees, UpdateDepartment } from '../Service/Service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faPlus,faTh } from '@fortawesome/free-solid-svg-icons';
import myImage from '../images/loader.gif';

const Department = () => {
    let [departmentlist, setDepartmentlist] = useState([]);
    let [departmentObj, setDepartmentObj] = useState({
        "deptId": 0,
        "deptName": "",
        "deptHeadEmpId": 0,
        "createdDate": new Date()
    })
    let [isLoader, setIsLoader] = useState(true);
    let [employeeslist, setEmployeeslist] = useState([])
    useEffect(() => {
        GetDepartments().then((data) => {
            setDepartmentlist(data)
            setIsLoader(false);
        });
        GetDepartments();

        GetEmployees().then((data) => {
            setEmployeeslist(data)
        });
        GetEmployees();

    }, [])
    const changeDepartmentValue = (event, key) => {
        setDepartmentObj(prevObj => ({ ...prevObj, [key]: event.target.value }))
    }
    const handleCreateDepartment = async () => {
        try {
            const result = await CreateDepartment(departmentObj);
            if (result.result) {
                alert('Department Created');
                const updatedDepartments = await GetDepartments();
                setDepartmentlist(updatedDepartments);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error creating department.');
        }
    };

    const onDeletehandle = async (deptId) => {
        try {
            const result = await DeleteDepartment(deptId);
            if (result.result) {
                alert('Department deleted');
                const updatedDepartments = await GetDepartments();
                setDepartmentlist(updatedDepartments);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error deleting department.');
        }
    }
    const onEdithandle = (deptId) => {
        const departmentToEdit = departmentlist.find(department => department.deptId === deptId);
        setDepartmentObj({
            "deptId": departmentToEdit.deptId,
            "deptName": departmentToEdit.deptName,
            "deptHeadEmpId": departmentToEdit.deptHeadEmpId,
            "createdDate": departmentToEdit.createdDate
        });
        setFormstate(true);
    }

    const updateDepartmentData = async () => {
        try {
            const result = await UpdateDepartment(departmentObj);
            if (result.result) {
                alert('Department updated');
                const updatedDepartments = await GetDepartments();
                setDepartmentlist(updatedDepartments);
            } else {
                alert(result.data.message);
            }
        } catch (error) {
            alert('Error updating department');
        }
    }
    const reset = () => {
        setDepartmentObj({
            "deptId": 0,
            "deptName": "",
            "deptHeadEmpId": 0,
            "createdDate": new Date()
        })
    }
    let [cardview, setCardview] = useState(false);
    const ShowCardView = () => {
        setCardview((prevCardview) => !prevCardview);
    };

    let [formstate, setFormstate] = useState(false);
    const ShowForm = () => {
        setFormstate((prevform) => !prevform);
    }
    return (
        <div className='container mt-4'>
            <div className='row'>
                {formstate && <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-secondary text-white'>
                            <div className='row align-items-center'>
                                <div className='col-10'>
                                    <strong>New Department</strong>
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
                                    <label>Department Name</label>
                                    <input type='text' value={departmentObj.deptName} onChange={(event) => { changeDepartmentValue(event, 'deptName') }} className='form-control' />
                                </div>
                                <div className='col-6'>
                                    <label>Department Head Name</label>
                                    <select className='form-select' value={departmentObj.deptHeadEmpId} onChange={(event) => { changeDepartmentValue(event, 'deptHeadEmpId') }}  >
                                        <option>Select Department Head Name</option>
                                        {
                                            employeeslist.map((item) => {
                                                return (<option value={item.employeeId}>{item.employeeName}</option>)
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
                                    {departmentObj.deptId === 0 && <button className='btn btn-sm btn-success' onClick={handleCreateDepartment} disabled={departmentObj.deptId === 0 && (!departmentObj.deptName || !departmentObj.deptHeadEmpId)}> Create Department</button>}
                                    {departmentObj.deptId !== 0 && <button className='btn btn-sm btn-warning' onClick={updateDepartmentData} > Update Department</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className={formstate ? 'col-8' : 'col-12'}>
                    <div className='card'>
                        <div className='card-header bg-secondary  text-white row'>
                            <div className='col-10 text-center'> <strong> Departments List</strong></div>
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
                                        <th>Department Name</th>
                                        <th>Department Head Name</th>
                                        <th>Action</th>
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
                                        departmentlist && departmentlist.map((item, index) => {
                                            return (<tr>
                                                <td>{index + 1} </td>
                                                <td> {item.deptName} </td>
                                                <td> {item.deptHeadName}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-primary' onClick={() => { onEdithandle(item.deptId) }} > <FontAwesomeIcon icon={faEdit} style={{ color: 'white', fontSize: '15px' }} /></button>
                                                    <button className='btn btn-sm btn-danger ms-2' onClick={() => {onDeletehandle (item.deptId) }}   > <FontAwesomeIcon icon={faTimes} style={{ color: 'white', fontSize: '15px' }} /></button>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>}
                            </table>}
                            {cardview && (
                                <div className='row'>
                                    {departmentlist && departmentlist.map((item) => (
                                        <div className="card col-md-3 m-3 p-2" style={{ width: '18rem' }}>
                                            <div className="card-body bg-info">
                                                <h5 className="card-title">{item.deptName}</h5>
                                                <p className="card-text">Department Head : {item.deptHeadName}</p>
                                            </div>                                           
                                            <div className="card-footer d-flex justify-content-end bg-secondary">
                                                <button className="btn btn-sm btn-primary me-2" onClick={() => { onEdithandle(item.deptId) }}>Edit</button>
                                                <button className="btn btn-sm btn-danger" onClick={() => { onDeletehandle(item.deptId) }}>Delete</button>
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

export default Department;


