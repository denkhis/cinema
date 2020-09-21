import {User} from './user';

export class Form {
	constructor() {
		this.createData();
	}

	createData() {
		document.querySelector('#form')
			.addEventListener('submit', (e) => {
				e.preventDefault();
				const loginInput = document.querySelector('.form__input--login');
				const loginPassword = document.querySelector('.form__input--password');
				new User(loginInput.value, loginPassword.value);
			})
	}
}