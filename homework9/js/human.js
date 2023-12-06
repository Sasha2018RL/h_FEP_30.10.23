function Human(name, gender) {
    if (!name || !gender){
        throw new Error('Name and gender are required!');
    }

    this.name = name;
    this.gender = gender;
}

Human.prototype.toString = function () {
    return `${this.name} - ${this.gender}`;
}