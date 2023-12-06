function House(max_flats) {
    if (typeof max_flats !== 'number' || max_flats <= 0) {
        throw new Error('Max flats count required!');
    }

    this.max_flats = max_flats;
    this.flats = [];
}

House.prototype.addFlat = function (flat) {
    if (!flat) {
        throw new Error('Flat is required!')
    }

    if (this.flats.length >= this.max_flats) {
        console.log('Flats count limit exceeded!');

        throw new Error('Too much flats!');
    }

    this.flats.push(flat);
}

House.prototype.toString = function () {
    return `
House max flats: ${this.max_flats}
House flats:
${this.flats.map(f => f.toString()).join('\n')}`
}