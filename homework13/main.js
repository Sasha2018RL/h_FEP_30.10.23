function submit(event) {
    console.log(event)
    event.preventDefault();

    const form_data = new FormData(event.target);

    const keys = {
        first_name: {title: 'Имя'},
        last_name: {title: 'Фамилия'},
        birthday: {title: 'Дата рождения'},
        gender: {
            title: 'Пол',
            values: {male: 'Мужской', female: 'Женский'}
        },
        city: {
            title: 'Город',
            values: {
                odessa: 'Одесса',
                nikolaev: 'Николаев',
                kherson: 'Херсон',
                kharkov: 'Харьков',
                other: 'Другой'
            }
        },
        address: {title: 'Адрес'},
        lng: {
            title: 'Язык',
            values: {
                russian: 'Русский',
                ukrainian: 'Украинский',
                english: 'Английский'
            }
        },
    }

    const result = document.getElementById('result');
    result.innerHTML = '';

    for(let [field, value] of form_data){

        const field_el = document.createElement('ul');

        const field_info = keys[field];

        if (!field_info){
            continue;
        }

        if (field_info.values){
            value = field_info.values[value];
        }

        field_el.innerText = `${keys[field].title}: ${value}`;

        result.appendChild(field_el);
    }
}