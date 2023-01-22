
const onloadTable = async () => {
    const tbody = document.getElementById('tbody')
    let resp = await fetch('https://localhost:44319/api/DepartmentWithData')
    let departments = await resp.json()
    departments.forEach(dep => {
        let id = dep.department_id
        let tr = document.createElement('tr')
        tbody.appendChild(tr)
        let tdId = document.createElement('td')
        tdId.innerText = dep.department_id
        tr.appendChild(tdId)
        let tdName = document.createElement("td")
        tdName.innerText = dep.department_name
        tr.appendChild(tdName)
        let tdManager = document.createElement("td")
        tdManager.innerText = dep.manager
        tr.appendChild(tdManager)
        let tdEmployees = document.createElement('td')
        let ul = document.createElement('ul')
        dep.employees.forEach(emp => {
            let li = document.createElement('li')
            li.innerText = emp
            ul.appendChild(li)
        })
        tdEmployees.appendChild(ul)
        tr.appendChild(tdEmployees)
        let tdOptions = document.createElement('td')
        tr.appendChild(tdOptions)
        let edit = document.createElement('a')
        edit.innerText = "edit"
        edit.classList = "btn btn-primary "
        edit.href = ("editDepartment.html?id=" + id)
        tdOptions.appendChild(edit)
        let deleteBtn = document.createElement('button')
        deleteBtn.classList = "btn btn-primary "
        deleteBtn.innerText = "delete"
        deleteBtn.onclick = () => {
            deleteDep(id)
        }
        tdOptions.appendChild(deleteBtn)

    });
    const AddEmpSelectr = document.getElementById('selectManager')
    let resp2 = await fetch('https://localhost:44319/api/Employees')
    let emps = await resp2.json();
    emps.forEach(emp => {
        let option = document.createElement('option')
        option.value = emp.employee_id
        option.innerText = (`${emp.first_name} ${emp.last_name}`)
        AddEmpSelectr.appendChild(option)
    })
}


const addDepartment = async () => {
    userActions()
    const select = document.getElementById("selectManager")
    const nameInput = document.getElementById("name")
    let obj = {
        department_name: nameInput.value,
        manager_id: select.value
    }
    let fetchParams = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "content-type": "application/json" }
    }
    if (select.value == 30000) {
        alert('you cant add a department with no manager!')
    } else {
        await fetch("https://localhost:44319/api/Department/", fetchParams)

        location.href = "departments.html"
    }
}

const deleteDep = async (id) => {
    let resp = await fetch("https://localhost:44319/api/DepartmentWithData/" + id)
    let dep = await resp.json()
    if (dep.employees.length > 0) {
        alert("you cant delete Department with registered workers. move them to the not assigned deparment")
    } else {
        userActions()
        let fetchParams = {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        }
        await fetch("https://localhost:44319/api/Department/" + id, fetchParams)
        document.getElementById('tbody').innerHTML = ""
        onloadTable();
    }
}
