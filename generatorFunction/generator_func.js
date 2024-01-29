// run using node

function* ID_generator(max = -1) {
    let id = 0;

    while(id < max || max === -1){
        yield id;
        id++;
    }
}

const generator = ID_generator(20);

for(let i = 0; i < 25; i++){
    const val = generator.next();

    if (val.done){
        console.log(`Generator finished in ${i} iterations!`);
        break;
    }

    console.log(val.value);
}
