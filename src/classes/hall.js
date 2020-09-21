export class Hall {
	constructor(day, film, time) {
		this.day = day;
		this.film = film;
		this.time = time;
		this.drawHallScheme();
		this.init();
		this.places;
	}

	async getHallScheme() {
		const response = await fetch(`https://5f5360f7e5de110016d5184d.mockapi.io/cinema/halls/${this.film}`, {
			method: "GET",
		});
		const data = await response.json();
		return data;
	}

	async drawHallScheme() {
		const hallPlace = document.querySelector('.hall__place');
		const data = localStorage.getItem(this.toString());
		this.places = data ? JSON.parse(data) : [];

		const sheme = await this.getHallScheme();
		const width = 30 * sheme.numberOfSeats + (sheme.numberOfSeats - 1) * (180 / (sheme.numberOfSeats - 1));
    hallPlace.style.width = `${width}px`;
    
		for (let i = 1; i <= sheme.numberOfRows; i++) {
			const row = document.createElement('div');
			row.className = 'hall__row';

			for (let j = 1; j <= sheme.numberOfSeats; j++) {

				const place = this.places.find((obj) => obj.row == i && obj.seat == j);

				const seats = document.createElement('div');
				seats.className = 'hall__seats';
				seats.textContent = j;
				seats.setAttribute('data-row', i);
				seats.setAttribute('data-seat', j);

				if (place && seats.dataset.row === place.row && seats.dataset.seat === place.seat) {
					seats.className = 'hall__seats--disabled';
				}

				row.append(seats);

			}
			hallPlace.append(row);
		}
	}

	init() {
		const overlay = document.querySelector('.overlay');
		const closeButton = document.querySelector('.modal__button');
		const buyButton = document.querySelector('.modal__buy');
		const hallPlace = document.querySelector('.hall__place');
		const price = document.querySelector('.modal__sum #price');
		const basket = document.querySelector('.header #price');
		const ticketsNumber = document.querySelector('#tickets');

		let sum = 0;
		let tickets = 0;

		function chooseSeats(event) {
			const seat = event.target;

			if (seat.className === 'hall__place' || seat.className === 'hall__row') {
				return;
			}
			if (seat.className !== 'hall__seats--disabled') {
				if (seat.classList.contains('hall__seats--active')) {
					seat.classList.toggle('hall__seats--active');
					sum -= 10;
					tickets--;
					if (tickets === 1) {
						ticketsNumber.textContent = `${tickets} ticket`;
					} else {
						ticketsNumber.textContent = `${tickets} tickets`;
					}

				} else {
					seat.classList.toggle('hall__seats--active');
					sum += 10;
					tickets++;
					if (tickets === 1) {
						ticketsNumber.textContent = `${tickets} ticket`;
					} else {
						ticketsNumber.textContent = `${tickets} tickets`;
					}
				}
			}
			price.textContent = `${sum}$`;
		}

		function closeModalWindow() {
			overlay.hidden = true;
			hallPlace.innerHTML = '';
			sum = 0;
			price.textContent = '0$';
			tickets = 0;
			ticketsNumber.textContent = '0 tickets';
			removeEventListener('click', closeModalWindow);
		}

		const buyTickets = () => {
			const disabledSeats = document.querySelectorAll('.hall__seats--active');

			for (const seat of disabledSeats) {
				seat.className = 'hall__seats--disabled';
				this.places.push({
					row: seat.dataset.row,
					seat: seat.dataset.seat,
				});
			}

			localStorage.setItem(`${this.toString()}`, JSON.stringify(this.places));
			basket.textContent = `${parseInt(basket.textContent) + sum}$`;
			sum = 0;
			price.textContent = '0$';
			tickets = 0;
			ticketsNumber.textContent = '0 tickets'
			overlay.hidden = true;
			hallPlace.innerHTML = '';
		}

		hallPlace.onclick = chooseSeats;
		closeButton.onclick = closeModalWindow;
		buyButton.onclick = buyTickets;
	}

	toString() {
		return `${this.day}${this.film}${this.time}`;
	}
}