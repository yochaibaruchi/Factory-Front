



const empsTable = async () => {
    let resp = await fetch('https://localhost:44319/api/EmployeesWithData')
    let employees = await resp.json()
    employees.forEach(emp => {
        let id = emp.employee_id
        let table = document.getElementById('tbody')
        let tr = document.createElement('tr')
        // simple data into table data
        table.appendChild(tr)
        let td1 = document.createElement('td')
        td1.innerText = emp.employee_id
        tr.appendChild(td1)
        let td2 = document.createElement('td')
        td2.innerText = emp.first_name;
        tr.appendChild(td2)
        let td3 = document.createElement('td')
        td3.innerText = emp.last_name;
        tr.appendChild(td3)
        let td4 = document.createElement('td')
        td4.innerText = emp.start_work_date
        tr.appendChild(td4)
        let td5 = document.createElement('td')
        td5.innerText = emp.department_name;
        tr.appendChild(td5)
        let td6 = document.createElement('td')
        td6.style.width = "40%"
        //craet an ul for shifts
        let ul = document.createElement('ul')
        emp.shifts.forEach(shift => {
            let li = document.createElement('li')
            li.innerText = shift.id + " start :" + shift.start_time.replace('T', ' ') + ", end: " + shift.end_time.replace('T', ' ')
            ul.appendChild(li)
        })
        td6.appendChild(ul)
        tr.appendChild(td6)
        // buttons
        let td7 = document.createElement('td')
        let edit = document.createElement('a')
        edit.innerText = "edit"
        edit.classList = "btn btn-primary "
        edit.href = ("editEmployee.html?id=" + id)
        let deleteBtn = document.createElement('button')
        deleteBtn.classList = "btn btn-primary "
        deleteBtn.innerText = "delete"
        deleteBtn.onclick = () => {
            deleteEmp(id)
        }
        let shiftbtn = document.createElement('button')
        shiftbtn.classList = "btn btn-primary "
        shiftbtn.innerText = "add shift"
        shiftbtn.setAttribute("data-bs-toggle", "modal")
        shiftbtn.setAttribute("data-bs-target", "#exampleModal")
        shiftbtn.setAttribute("data-bs-whatever", "@fat")
        shiftbtn.onclick = () => {
            const empDiv = document.getElementById('employeeDiv')
            const empID = document.getElementById('empId')
            empID.innerText = id
            empDiv.innerText = (`${emp.first_name} ${emp.last_name}`)

        }

        td7.appendChild(deleteBtn);
        td7.appendChild(edit)
        td7.appendChild(shiftbtn);
        tr.appendChild(td7)


    });
}

const search = async () => {
    document.getElementById('tbody').innerHTML = ""
    let search = document.getElementById('search').value

    let resp = await fetch('https://localhost:44319/api/EmployeesWithData?search=' + search)
    let data = await resp.json()

    data.forEach(emp => {
        let table = document.getElementById('tbody')
        let tr = document.createElement('tr')
        // simple data into table data
        table.appendChild(tr)
        let td1 = document.createElement('td')
        td1.innerText = emp.employee_id
        tr.appendChild(td1)
        let td2 = document.createElement('td')
        td2.innerText = emp.first_name;
        tr.appendChild(td2)
        let td3 = document.createElement('td')
        td3.innerText = emp.last_name;
        tr.appendChild(td3)
        let td4 = document.createElement('td')
        td4.innerText = emp.start_work_date
        tr.appendChild(td4)
        let td5 = document.createElement('td')
        td5.innerText = emp.department_name;
        tr.appendChild(td5)
        let td6 = document.createElement('td')
        td6.style.width = "40%"
        //craet an ul for shifts
        let ul = document.createElement('ul')
        emp.shifts.forEach(shift => {
            let li = document.createElement('li')
            li.innerText = shift.id + " start:" + shift.start_time.replace('T', ' ') + ", end:" + shift.end_time.replace('T', ' ')
            console.log(li.innerText);
            ul.appendChild(li)
        })
        td6.appendChild(ul)
        tr.appendChild(td6)
        // buttons
        let td7 = document.createElement('td')
        let edit = document.createElement('a')
        edit.innerText = "edit"
        edit.classList = "btn btn-primary "
        edit.href = ("editEmployee.html?id=" + emp.employee_id)
        let deleteBtn = document.createElement('button')
        deleteBtn.classList = "btn btn-primary "
        deleteBtn.innerText = "delete"
        deleteBtn.onclick = () => {
            deleteEmp(id)
        }
        let shiftbtn = document.createElement('button')
        shiftbtn.classList = "btn btn-primary "
        shiftbtn.innerText = "add shift"
        shiftbtn.setAttribute("data-bs-toggle", "modal")
        shiftbtn.setAttribute("data-bs-target", "#exampleModal")
        shiftbtn.setAttribute("data-bs-whatever", "@fat")
        shiftbtn.onclick = () => {
            const empDiv = document.getElementById('employeeDiv')
            const empID = document.getElementById('empId')
            empID.innerText = id
            empDiv.innerText = (`${emp.first_name} ${emp.last_name}`)
        }
        td7.appendChild(deleteBtn);
        td7.appendChild(edit)
        td7.appendChild(shiftbtn);
        tr.appendChild(td7)
    });


}


const deleteEmp = async (id) => {
    userActions()
    let resp = await fetch("https://localhost:44319/api/Department")
    let deparment = await resp.json();
    let dep = deparment.find(x => x.manager_id === id)
    if (dep != undefined) {
        alert(`employee is assigned as manager in ${dep.department_name} `)
    } else {
        let fetchParams = {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        }
        await fetch("https://localhost:44319/api/Employees/" + id, fetchParams)
        document.getElementById('tbody').innerHTML = ""
        empsTable();

    }
}




const openModel = async () => {
    let resp = await fetch("https://localhost:44319/api/shifts")
    let shifts = await resp.json();
    let select = document.getElementById("selectShifts")
    shifts.forEach(x => {
        let opt = document.createElement('option')
        opt.innerText = x.start_time
        opt.value = x.id
        select.appendChild(opt)
    })
}



const addShift = async () => {
    userActions()
    const empID = document.getElementById('empId')
    const shiftID = document.getElementById('selectShifts')
    let obj = { employee_id: empID.innerText, shift_id: shiftID.value }
    let fetchParams = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "content-type": "application/json" }
    }
    await fetch("https://localhost:44319/api/Employee_shifts", fetchParams)
    document.getElementById('tbody').innerHTML = ""
    empsTable();

}


const openAddEmp = async () => {
    let resp = await fetch("https://localhost:44319/api/Department")
    let departments = await resp.json();
    let selectDepartment = document.getElementById("selectDepartment")
    departments.forEach(dep => {
        let opt = document.createElement('option')
        opt.innerText = dep.department_name
        opt.value = dep.department_id
        selectDepartment.appendChild(opt)
    })
}

const addEmp = async () => {
    userActions()
    const empFristname = document.getElementById('firstName')
    const empLastName = document.getElementById('lasttName')
    const selectDepartment = document.getElementById('selectDepartment')
    const time = document.getElementById('time')
    if (selectDepartment.value == 300000) {
        alert('you must give the employee adepartment, if he is not assigned yet place him in the not assigned!')
    } else {

        let obj = {
            first_name: empFristname.value,
            last_name: empLastName.value,
            start_work_date: time.value,
            department_id: selectDepartment.value
        }
        let fetchParams = {
            method: "POST",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" }
        }
        await fetch("https://localhost:44319/api/Employees", fetchParams)
        document.getElementById('tbody').innerHTML = ""
        empsTable();
    }
}


openAddEmp()
openModel();





