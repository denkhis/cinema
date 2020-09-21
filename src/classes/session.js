import {Hall} from './hall';
import {filmsTime} from '../index';
import {halls} from '../index';

export class Session {
	constructor(day, film) {
		this.day = day;
		this.film = film;
		this.createSession();
		this.init();
	}

	createSession() {
		const posterSession = document.createElement('div');
		const posterWrap = document.querySelector(`[data-poster = "${this.film}"] .poster__wrapper`);
		posterSession.className = 'poster__session';

		function formatTime(date) {
			let hour = date.getHours();
			let minutes = date.getMinutes();
			hour = hour < 10 ? '0' + hour : hour;
			minutes = minutes < 10 ? '0' + minutes : minutes;
			return `${hour}:${minutes}`;
		}

		const currentDay = new Date().getDay();
		const currentTime = formatTime(new Date());
		const disabledSessions = filmsTime.filter((time) => time < currentTime);

		for (let i = 0; i < filmsTime.length; i++) {
			const posterTime = document.createElement('div');
			posterTime.className = 'poster__time';
			posterTime.textContent = `${filmsTime[i]}`;
			posterTime.setAttribute('data-film', `${this.film}`);
			posterTime.setAttribute('data-time', `${i + 1}`);
			if (currentDay == this.day) {
				for (let j = 0; j < disabledSessions.length; j++) {
					if (filmsTime[i] == disabledSessions[j]) {
						posterTime.classList.add('poster__time--disabled');
					}
				}
			}
			posterSession.append(posterTime);
		}
		posterWrap.append(posterSession);
	}

	init() {
		const posterSession = document.querySelector(`[data-poster = "${this.film}"] .poster__session`);

		posterSession.addEventListener('click', (e) => {
			const overlay = document.querySelector('.overlay');
			const posterTime = e.target;

			if (posterTime.className === 'poster__time') {
				overlay.hidden = false;
				const exist = halls.find((obj) => {
					if (obj.day === this.day && obj.film === posterTime.dataset.film && obj.time === posterTime.dataset.time) {
						return obj;
					}
				});

				if (!exist) {
					halls.push(new Hall(this.day, posterTime.dataset.film, posterTime.dataset.time));
				} else {
					exist.drawHallScheme();
					exist.init();
				}
			}
		});
	}

}