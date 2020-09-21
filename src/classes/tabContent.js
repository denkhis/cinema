import {Session} from './session';
import {firstPostersList} from '../index';
import {secondPostersList} from '../index';
import {sessions} from '../index';

export class TabContent {
	constructor(day) {
		this.day = day;
		this.createContent();
  }
  
  createContentPattern(films, i, postersList) {
    const tabContent = document.querySelector('.tab-content');
    const poster = document.createElement('div');
    const posterWrap = document.createElement('div');

    const posterBlock = document.createElement('div');
    const posterImage = document.createElement('img');
    const posterDescription = document.createElement('div');
    const posterTitle = document.createElement('h3');
    const posterText = document.createElement('p');
    const posterAgeLimit = document.createElement('div');

    poster.className = 'poster';
    posterWrap.className = 'poster__wrapper';
    posterBlock.className = 'poster__block';
    posterDescription.className = 'poster__description';
    posterTitle.className = 'poster__title';
    posterText.className = 'poster__year';
    posterAgeLimit.className = 'poster__age-limit';
    posterImage.className = 'poster__image';

    poster.setAttribute('data-poster', `${i + 1}`);
    posterImage.setAttribute('src', `${postersList[i]}`);
    posterImage.setAttribute('alt', 'img');

    posterTitle.textContent = films[i].name;
    posterText.textContent = films[i].year;
    posterAgeLimit.textContent = `+${films[i].age}`;

    poster.append(posterWrap);
    posterWrap.append(posterBlock);
    posterBlock.append(posterImage, posterDescription);

    posterDescription.append(posterTitle, posterText, posterAgeLimit);

    tabContent.append(poster);

    const exist = sessions.find((obj) => obj.day === this.day && obj.film === poster.dataset.poster);
    if (!exist) {
      sessions.push(new Session(this.day, poster.dataset.poster));
    } else {
      exist.createSession();
      exist.init();
    }
  }

	async getFirstListFilms() {
		const response = await fetch('https://5f5360f7e5de110016d5184d.mockapi.io/cinema/films', {
			method: "GET",
		});
		const result = await response.json();
		return result;
	}

	async getSecondListFilms() {
		const response = await fetch('https://5f5360f7e5de110016d5184d.mockapi.io/cinema/films2', {
			method: "GET",
		});
		const result = await response.json();
		return result;
	}

	async createContent() {
		const tabContent = document.querySelector('.tab-content');
		if (this.day > 0 && this.day < 5) {
			tabContent.innerHTML = '';
			const films = await this.getFirstListFilms();

			for (let i = 0; i < films.length; i++) {
				this.createContentPattern(films, i, firstPostersList);
			}
		} else {
			tabContent.innerHTML = '';
      const films = await this.getSecondListFilms();
      
			for (let i = 0; i < films.length; i++) {
				this.createContentPattern(films, i, secondPostersList);
			}

		}
	}
}