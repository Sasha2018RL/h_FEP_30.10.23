function Flat(){
    this.people = []
}

Flat.prototype.addHuman = function (human) {
    if(!human){
        throw new Error('Human is required!');
    }

    this.people.push(human);
}

Flat.prototype.toString = function () {
    return `Flat livers: ${this.people.map(h => h.toString()).join(', ')}`;
}