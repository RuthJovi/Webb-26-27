function showData(){
    // add divs with class "card" to the div car-list
    const carList = document.getElementById('car-list');
    // clear old content
    carList.innerHTML = '';
    
    fetch('http://localhost:3000/cars')
        .then(response => response.json())
        .then(cars => {
            cars.forEach(car => { //for each car in the array, create a card
                const card = document.createElement('div');
                card.classList.add('card'); //add the class
                // structure of the card
                card.innerHTML = ` 
                    <h3>${car.brand} ${car.model}</h3>
                    <p class="id-text">ID: ${car.id}</p>
                    <p>Year: ${car.year}</p>
                    <p>Licensed: ${car.license_plate}</p>
                    <p>Price: $${car.price_per_day}/day</p>
                    <button class="delete-button" onclick="deleteCar('${car.id}')">Delete</button>
                `;
                carList.appendChild(card); //add each card to the car-list div
            });
        })
}

function addCar() {
    //use the info from "add-form" 
    let brand = document.getElementsByName("brand")[0].value;
    let model = document.getElementsByName("model")[0].value;
    let year = document.getElementsByName("year")[0].value;
    let license_plate = document.getElementsByName("license_plate")[0].value.toUpperCase(); //make license plate uppercase (?)
    let price_per_day = document.getElementsByName("price_per_day")[0].value;
    // stop the from from submitting if any of the fields are empty
    if (brand === "" || model === "" || year === "" || license_plate === "" || price_per_day === "") {
        alert("Please fill in all fields");
        return;
    }
    //stop if license plate is not 6 characters long
    if (license_plate.length !== 6) {
        alert("License plate must be 6 characters long");
        return;
    }
    //stop if year is not between 1960 and 2026, or if price per day is not between 10 and 10000
    if (parseInt(year) < 1960 || parseInt(year) > 2026) {
        alert("Year must be between 1960 and 2026");
        return;
    }
    if (parseFloat(price_per_day) < 10 || parseFloat(price_per_day) > 10000) {
        alert("Price per day must be between 10 and 10000");
        return;
    }

    let newCar = { //create a new car object with the info from the form
        id: Date.now().toString(), // Generate a unique ID based on timestamp
        license_plate: license_plate,
        //capitalize the first letter of brand and model
        brand: brand.charAt(0).toUpperCase() + brand.slice(1), //asked AI to help with this
        model: model.charAt(0).toUpperCase() + model.slice(1),
        year: parseInt(year),
        price_per_day: parseFloat(price_per_day),
        available: true
    };
    
    fetch('http://localhost:3000/cars', { //method POST to add the new car to the database car.json
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
    .then(response => {
        if (response.ok) {
            showData(); // Refresh the car list
            document.getElementById("add-form").reset(); // Reset the form
        } else {
            console.error('Error adding car');
        }
    })
}

function deleteCar(id) {
    // if the user confirms, delete the car
    if (!confirm("Are you sure you want to delete this car?")) {
        return; 
    }
    fetch(`http://localhost:3000/cars/` + id, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            showData(); // Refresh the car list
        } else {
            console.error('Error deleting car');
        }
    })
}

function searchCars() { //function is activated by search button
    const searchInput = document.getElementById('search-bar').value.toLowerCase(); //get the value from the search bar
    const carList = document.getElementById('car-list');
    carList.innerHTML = ''; // clear old content 
    fetch('http://localhost:3000/cars')
        .then(response => response.json())
        .then(cars => {
            cars.forEach(car => {
                if (car.brand.toLowerCase().includes(searchInput)) { //if the car brand is the same as the search input, show that car
                    //copied from showData()
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = ` 
                        <h3>${car.brand} ${car.model}</h3>
                        <p class="id-text">ID: ${car.id}</p>
                        <p>Year: ${car.year}</p>
                        <p>Licensed: ${car.license_plate}</p>
                        <p>Price: $${car.price_per_day}/day</p>
                        <button class="delete-button" onclick="deleteCar('${car.id}')">Delete</button>
                    `;
                    carList.appendChild(card);
                }
            });
        });
    //if search bar is empty, it will show all cars
}
