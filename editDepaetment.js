const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const id = params.id
const EdidOnload = async () => {
    const select = document.getElementById("selectMamagerEdit")
    const nameInput = document.getElementById("departmentName")
    let resp = await fetch('https://localhost:44319/api/Department/' + id)
    let department = await resp.json()
    console.log(department);
    nameInput.value = department.department_name;
    let resp2 = await fetch("https://localhost:44319/api/EmployeesWithData?search=" + department.department_name)
    let employeeWithData = await resp2.json();
    employeeWithData.forEach(emp => {
        let option = document.createElement('option')
        option.value = emp.employee_id
        option.innerText = (`${emp.first_name} ${emp.last_name}`)
        select.appendChild(option)
    });
}

const updateDep = async () => {

    const select = document.getElementById("selectMamagerEdit")
    const nameInput = document.getElementById("departmentName")
    let obj = {
        department_id: id,
        department_name: nameInput.value,
        manager_id: select.value
    }
    let fetchParams = {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: { "content-type": "application/json" }
    }
    if (select.value == 30000) {
        alert("must pick a manager")
    } else {
        userActions()
        await fetch("https://localhost:44319/api/Department/" + id, fetchParams)

        location.href = "departments.html"
    }
}



