import {Form} from './classes/form';
import {Tab} from './classes/tab';
import {TabContent} from './classes/tabContent';
import './styles/style.css';

import movie1 from './assets/firstPosters/movie1.jpg';
import movie2 from './assets/firstPosters/movie2.jpg';
import movie3 from './assets/firstPosters/movie3.jpg';
import movie4 from './assets/firstPosters/movie4.jpg';
import movie5 from './assets/firstPosters/movie5.jpg';
import movie6 from './assets/firstPosters/movie6.jpg';

import movie7 from './assets/secondPosters/movie7.jpg';
import movie8 from './assets/secondPosters/movie8.jpg';
import movie9 from './assets/secondPosters/movie9.jpg';
import movie10 from './assets/secondPosters/movie10.jpg';
import movie11 from './assets/secondPosters/movie11.jpg';
import movie12 from './assets/secondPosters/movie12.jpg';

export const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = ['January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August',
	'September', 'October', 'November', 'December'];

export const year = new Date().getFullYear();
export const month = new Date().getMonth();
export const date = new Date().getDate();

export const firstPostersList = [movie1, movie2, movie3, movie4, movie5, movie6];
export const secondPostersList = [movie7, movie8, movie9, movie10, movie11, movie12];
export const filmsTime = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
export const sessions = [];
export const tabsContent = [];
export const halls = [];

new Form();
new Tab();
const currentTabContent = new TabContent(String(new Date().getDay()));
tabsContent.push(currentTabContent);

