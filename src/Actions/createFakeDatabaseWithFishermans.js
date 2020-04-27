const faker = require('faker');
const fs = require('fs');

function generateRandomCatches(){
   let catches = []
   let species = ["Carp","Catfish","Salmon","Hekk","Shark","Aligator","Turtle"]

    for(let i = 0;i < 5;i++){
        let specie = species[Math.round(Math.random()*6)]
        let date = faker.date.recent()
        let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        catches.push({
            id: `${faker.random.number()}`,
            specie: specie,
            weight: Math.random()*100,
            lake: `${faker.name.lastName()} Lake`,
            date: `${formattedDate}`,
            coordinate: `(${faker.random.number()},${faker.random.number()})`
        })
    }

    return catches
}

function generateRandomRods(){
    let rods=[]

    for(let i = 0; i < 5;i++) {
        rods.push({
                id: `${faker.random.number()}`,
                name: `${faker.commerce.productName()}`,
                material: `${faker.commerce.productMaterial()}`,
                price: `${faker.commerce.price()}`

        })
    }

    return rods;
}

function generateRandomBoiles(){
    let boiles = []
    for(let i = 0; i < 5;i++) {
        boiles.push({
                id: `${faker.random.number()}`,
                name: `${faker.commerce.productName()}`,
                material: `${faker.commerce.productMaterial()}`,
                price: `${faker.commerce.price()}`
        })
    }

    return boiles
}

function generateRandomPeople() {
    let people = [];

    for (let i = 0; i < 100; i++) {
        people.push({
            id: faker.random.number(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            address: `${faker.address.streetAddress()}`,
            state : `${faker.address.state()}`,
            equipment: {rods: generateRandomRods(),boiles: generateRandomBoiles()},
            catches: generateRandomCatches()
        })
    }
    return people;
}

fs.writeFile(
    '../../database.fake.json',
    JSON.stringify({fishermans: generateRandomPeople()}),
    (err)=>{console.log(err)}
);