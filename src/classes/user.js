export class User {
	constructor(login, password) {
		this.login = login;
		this.password = password;
		this.auth();
		this.init();
	}

	async auth() {
		const header = document.querySelector('.header');
		const main = document.querySelector('.main');
		const authorization = document.querySelector('.authorization');
		const footer = document.querySelector('.footer');
		const loginInput = document.querySelector('.form__input--login');
		const loginPassword = document.querySelector('.form__input--password');

		try {
			const response = await fetch('https://5f5360f7e5de110016d5184d.mockapi.io/cinema/users', {
				method: "GET",
			});
			const result = await response.json();
      const user = result.find((obj) => obj.login == this.login);
      
			if (user.password === this.password) {
				header.hidden = false;
				main.hidden = false;
				footer.hidden = false;
				authorization.hidden = true;
			} else {
				throw err;
      }
      
		} catch (err) {
			loginInput.classList.toggle('form__input--error');
			loginPassword.classList.toggle('form__input--error');
			setTimeout(() => {
				loginInput.classList.toggle('form__input--error');
				loginPassword.classList.toggle('form__input--error');
			}, 2000)
		}
	}

	logout() {
		const header = document.querySelector('.header');
		const main = document.querySelector('.main');
		const authorization = document.querySelector('.authorization');
		const footer = document.querySelector('.footer');
		header.hidden = true;
		main.hidden = true;
		footer.hidden = true;
		authorization.hidden = false;
	}

	init() {
		document.querySelector('.header__button')
			.addEventListener('click', this.logout);

	}
}