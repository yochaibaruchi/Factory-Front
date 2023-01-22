
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const empId = params.id

const openAddEmp = async () => {
    const empFristname = document.getElementById('firstNameEdit')
    const empLastName = document.getElementById('lasttNameEdit')
    const time = document.getElementById('timeEdit')
    let resp2 = await fetch("https://localhost:44319/api/Employees/" + empId)
    let employee = await resp2.json();
    let resp = await fetch("https://localhost:44319/api/Department")
    let departments = await resp.json();
    let selectDepartment = document.getElementById("selectDepartmentEdit")
    departments.forEach(dep => {
        let opt = document.createElement('option')
        opt.innerText = dep.department_name
        opt.value = dep.department_id
        selectDepartment.appendChild(opt)
    })

    empFristname.value = employee.first_name;
    empLastName.value = employee.last_name;
    time.value = employee.start_work_date

}



const updateEmp = async () => {
    const empFristname = document.getElementById('firstNameEdit')
    const empLastName = document.getElementById('lasttNameEdit')
    const selectDepartment = document.getElementById('selectDepartmentEdit')
    const time = document.getElementById('timeEdit')
    if (selectDepartment.value == 20000) {
        alert('you must select department.')
    } else {
        userActions()
        let obj = {
            employee_id: empId,
            first_name: empFristname.value,
            last_name: empLastName.value,
            start_work_date: time.value,
            department_id: selectDepartment.value
        }
        let fetchParams = {
            method: "PUT",
            body: JSON.stringify(obj),
            headers: { "content-type": "application/json" }
        }
        await fetch("https://localhost:44319/api/Employees/" + empId, fetchParams)

        location.href = "employees.html"
    }
}




