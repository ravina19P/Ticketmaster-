import axios from 'axios';
import * as myconstant from '../Constant/Constant'
const apiEndPoint = process.env.REACT_APP_API_END_POINT;

const logInEmployee = async (obj) => {
    const result = await axios.post(apiEndPoint + myconstant.LOG_IN, obj);
    return result.data
}
export { logInEmployee }

const GetDepartments = async () => {
    try {
        const responce = await axios.get(apiEndPoint + myconstant.GET_DEPARTMENTS);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetDepartments };


const CreateDepartment = async (obj) => {
    try {
        const result = await axios.post(apiEndPoint + myconstant.CREATE_DEPARTMENT, obj);
        return result.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};
export { CreateDepartment };

const DeleteDepartment = async (deptId) => {
    try {
        const result = await axios.delete(`${apiEndPoint}${myconstant.DELETE_DEPT}?id=${deptId}`);
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error Deleting department:', error);
        throw error;
    }
};
export { DeleteDepartment };

const UpdateDepartment = async (obj) => {
    try {
        const res = await axios.put(apiEndPoint + myconstant.UPDATE_DEPT, obj);
        return res.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};
export { UpdateDepartment };

const GetAllRoles = async () => {
    try {
        const res = await axios.get(apiEndPoint + myconstant.GET_ROLES);
        return res.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllRoles };

const GetEmployees = async () => {
    try {
        const res = await axios.get(apiEndPoint + myconstant.GET_EMPLOYEES);
        return res.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetEmployees };


const CreateEmployee = async (obj) => {
    try {
        const result = await axios.post(apiEndPoint + myconstant.CREATE_EMPLOYEE, obj);
        return result.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};
export { CreateEmployee };

const DeleteEmployee = async (employeeId) => {
    try {
        const result = await axios.delete(`${apiEndPoint}${myconstant.DELETE_EMPLOYEE}?id=${employeeId}`);
        console.log(result);
        return result.data;
    } catch (error) {
        console.error('Error Deleting department:', error);
        throw error;
    }
};
export { DeleteEmployee };

const GetEmployeeById = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_EMPLOYEE_BYID}?id=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error Deleting department:', error);
        throw error;
    }
};
export { GetEmployeeById };

const UpdateEmployee = async (obj) => {
    try {
        const res = await axios.put(apiEndPoint + myconstant.UPDATE_EMPLOYEE, obj);
        return res.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};
export { UpdateEmployee };

const CreateNewTicket = async (obj) => {
    try {
        const result = await axios.post(apiEndPoint + myconstant.CREATE_TICKET, obj);
        return result.data;
    } catch (error) {
        console.error('Error creating ticket', error);
        throw error;
    }
};
export { CreateNewTicket };

const GetTicketsCreatedByEmpId = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_TICKET_CREATED_BY_EMP_ID}?empId=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};
export { GetTicketsCreatedByEmpId };

const getNewTickets = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_NEW_TICKET}?deptHeadEmpId=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};
export { getNewTickets };
const GetEmployeesByDeptId = async (deptId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_EMPLOYEE_BY_DEPT_ID}?id=${deptId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
};
export { GetEmployeesByDeptId };

const AssignRequest = async (obj) => {
    try {
        const result = await axios.post(apiEndPoint + myconstant.ASIGN_REQUEST, obj);
        return result.data;
    } catch (error) {
        console.error('Error assigning ticket', error);
        throw error;
    }
};
export { AssignRequest };

const GetAssignedTicketsByEmpId = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_ASIGN_TICKET_BY_EMP_ID}?empId=${employeeId}`);
        console.log(res.data.data)
        return res.data.data;
    } catch (error) {
        console.error('Error getting ticket:', error);
        throw error;
    }
};
export { GetAssignedTicketsByEmpId };
// const GetAllTickets = async () => {
//     try {
//         const res = await axios.get(apiEndPoint + myconstant.GET_TICKET);
//         return res.data.data
//     } catch (error) {
//         console.log(error);
//     }
// };
// export {GetAllTickets};
const getEmployeeDashByEmpId = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_EMPLOYEE_DASHBOARD}?empId=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export { getEmployeeDashByEmpId };

const GetDeptHeadDashboardByDeptHead = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_DEPTHEAD_DASHBORAD}?deptHeadEmpId=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export { GetDeptHeadDashboardByDeptHead };

const getAdminEmployeeDashByEmpId = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_ADMIN_EMPLOYEE_DASHBOARD}?empId=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export { getAdminEmployeeDashByEmpId };

const GetSuperAdminDashboard = async () => {
    try {
        const responce = await axios.get(apiEndPoint + myconstant.GET_SUPERADMIN_DASHBOARD);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetSuperAdminDashboard };


const startTicket = async (ticketId) => {
    try {
        const res = await axios.post(`${apiEndPoint}${myconstant.START_TICKET}?id=${ticketId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export { startTicket };

const closeTicket = async (ticketId) => {
    try {
        const res = await axios.post(`${apiEndPoint}${myconstant.CLOSE_TICKET}?id=${ticketId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export { closeTicket };


const GetAllLeaves = async () => {
    try {
        const responce = await axios.get(apiEndPoint + myconstant.GET_ALL_LEAVES);
        return responce.data.data
    } catch (error) {
        console.log(error);
    }
};
export { GetAllLeaves };

const AddLeave = async (obj) => {
    try {
        const result = await axios.post(apiEndPoint + myconstant.ADD_LEAVES, obj);
        return result.data;
    } catch (error) {
        console.error('Error creating leaves:', error);
        throw error;
    }
};
export { AddLeave };

const GetLeavesForApprovalBySuperwiserId = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_LEVESFORAPROVAL_BYSUPERVISORID}?id=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export { GetLeavesForApprovalBySuperwiserId };

const ApproveLeave = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.APRROVE_LEAVE}?id=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error Aproving leave:', error);
        throw error;
    }
};
export { ApproveLeave };

const RejectLeave = async (leaveId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.REJECT_LEAVE}?id=${leaveId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error rejecting leave:', error);
        throw error;
    }
};
export { RejectLeave };

const GetAllLeavesByEmployeeId = async (employeeId) => {
    try {
        const res = await axios.get(`${apiEndPoint}${myconstant.GET_ALLLEAVE_BY_EMPID}?id=${employeeId}`);
        return res.data.data;
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};
export {GetAllLeavesByEmployeeId}