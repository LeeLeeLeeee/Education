export function makePerson(name : string, age: number){
    return{name, age}
}

export function testMakePerson(){
    console.log(
        makePerson('Jane',3),
        makePerson('Watson',50)
    )
}