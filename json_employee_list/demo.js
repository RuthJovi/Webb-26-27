/*
let empinfo = [
    {
        id:101, 
        name:"Max", 
        position:"cleaner"
    },
    {
        id:102, 
        name:"Lilian", 
        position:"manager"
    },
    {
        id:103, 
        name:"Williams", 
        position:"engineer"
    },
    {
        id:104, 
        name:"Onni", 
        position:"engineer"
    },
];

for (let i = 0; i < empinfo.length; i++){
    console.log("Id: " + empinfo[i].id + 
        "   Name: " + empinfo[i].name +
        "   Position: " + empinfo[i].position
    );
}
let engineerCount = 0;
for (let i = 0; i < empinfo.length; i++){
    if(empinfo[i].position == "engineer"){
        engineerCount++
    }
}
console.log("Number of engineers: " + engineerCount);

console.log("\nStringified:")
console.log(JSON.stringify(empinfo));
console.log("\nAnd parsed:")
console.log(JSON.parse(JSON.stringify(empinfo)));
*/

function consoleData(){
    fetch('http://localhost:3000/employees')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

function showData(){
    let table = document.getElementById("employeeTable");

    fetch('http://localhost:3000/employees')
        .then(function(response) {
            return response.json();
        })
        .then(function(employees) {

            for (let i = 0; i < employees.length; i++) {

                let row = table.insertRow();

                row.insertCell(0).textContent = employees[i].id;
                row.insertCell(1).textContent = employees[i].name;
                row.insertCell(2).textContent = employees[i].email;
                row.insertCell(3).textContent = employees[i].position;
                row.insertCell(4).textContent = employees[i].salary;

                let deleteCell = row.insertCell(5);
                let deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = function () {deleteEmployee(employees[i].id)};
                deleteCell.appendChild(deleteButton);

                let editCell = row.insertCell(6);
                let editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = function() {editEmployee(employees[i].id)};
                editCell.appendChild(editButton);

            }
        });
}

function deleteEmployee(id) {

    fetch("http://localhost:3000/employees/" + id, {
        method: "DELETE"
    })
    .then(function(response) {
        console.log("Employee deleted");
    });
}

function addEmployee(){
    let id = Number(document.getElementsByName("txtid")[0].value);
    let name = document.getElementsByName("txtname")[0].value;
    let email = document.getElementsByName("txtmail")[0].value;
    let position = document.getElementsByName("txtposition")[0].value;
    let salary = Number(document.getElementsByName("txtsalary")[0].value);

    let employee = {
        id: id,
        name: name,
        email: email,
        position: position,
        salary: salary
    };

    fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log("Employee added:", data);
        alert('Employee added to the list')
    });


}
