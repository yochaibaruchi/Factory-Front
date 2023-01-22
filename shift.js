const tableOnLLoad = async () => {
    const tbody = document.getElementById('tbody')
    let resp = await fetch('https://localhost:44319/api/ShiftWithData')
    let shifts = await resp.json();
    shifts.forEach(shift => {
        const tr = document.createElement('tr')
        tbody.appendChild(tr)
        const idTd = document.createElement('td')
        idTd.innerText = shift.id
        tr.appendChild(idTd)
        const sTd = document.createElement('td')
        sTd.innerText = shift.start_time.replace('T', ' ')
        tr.appendChild(sTd)
        const eTd = document.createElement('td')
        eTd.innerText = shift.end_time.replace('T', ' ')
        tr.appendChild(eTd)
        ul = document.createElement('ul')
        const empTD = document.createElement('td')
        empTD.appendChild(ul)
        shift.employees.forEach(emp => {
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.innerText = (`${emp.first_name} ${emp.last_name}`)
            a.href = ("editEmployee.html?id=" + emp.employee_id)
            li.appendChild(a)
            ul.appendChild(li)

        })
        tr.appendChild(empTD)
    });
}

const addShift = async () => {
    let start = document.getElementById('start')
    let end = document.getElementById('end')
    let obj = {
        start_time: start.value,
        end_time: end.value
    }
    let fetchParams = {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "content-type": "application/json" }
    }
    if (start.value == end.value || start.value > end.value || await check(start.value)) {

        alert('check if shift alredy exist or your end time is befor start time')
    } else {
        userActions()
        await fetch("https://localhost:44319/api/shifts", fetchParams)
        location.href = "shifts.html"
    }
}


const check = async (date) => {
    let resp = await fetch("https://localhost:44319/api/shifts")
    let shifts = await resp.json()
    return shifts.some(x => x.start_time.slice(0, 16) == date)
}

