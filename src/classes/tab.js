import {TabContent} from './tabContent';
import {year} from '../index';
import {month} from '../index';
import {date} from '../index';
import {week} from '../index';
import {months} from '../index';
import {tabsContent} from '../index';

export class Tab {
	constructor() {
		this.fillDateList();
		this.init();
	}

	fillDateList() {
		const dayOfWeek = document.querySelector('.tab__title');
		dayOfWeek.textContent = week[new Date().getDay()];

		const mainListItem = document.querySelector('.list-main__item');
		const subListItems = document.querySelectorAll('.sub-list__item');
    let sublist = '<ul class="sub-list">';
    
		for (let i = 0; i < subListItems.length; i++) {
			const currentDate = new Date(year, month, date + i);
			subListItems[i].textContent = `${currentDate.getDate()} ${months[new Date().getMonth()]}, ${new Date().getFullYear()}`;
			const sublistItem = `<li class="sub-list__item" data-day='${(new Date().getDay() + i) % 7}'>${subListItems[i].textContent}</li>`;
			sublist += sublistItem;
    }
    
		mainListItem.innerHTML = `${new Date().getDate()} ${months[new Date().getMonth()]}, ${new Date().getFullYear()}${sublist}</ul>`;
	}

	init() {
		const list = document.querySelector('.list-main__item');
		const sublist = document.querySelector('.sub-list');

		sublist.addEventListener('click', (e) => {
      const subListItem = e.target;
      
			if (subListItem.className === 'sub-list__item') {
				const dayOfWeek = document.querySelector('.tab__title');
				dayOfWeek.textContent = `${week[subListItem.dataset.day]}`;
				list.innerHTML = `${subListItem.textContent}${sublist.outerHTML}`;
				const exist = tabsContent.find((obj) => obj.day === subListItem.dataset.day)
				if (!exist) {
					tabsContent.push(new TabContent(subListItem.dataset.day));
				} else {
					exist.createContent();
        }
        
				return this.init();
			}
		})
	}
}
