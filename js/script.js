const url = './data.json'
let fetchPromise = fetch(url)
let timeObj;

fetchPromise
	.then(response => {
		if (!response.ok) {
			throw new Error("Connection error", response.status)
		}
		return response.json()
	})
	.then(obj => {
		timeObj = obj;
	})
	.catch(err => {
		console.log(err);
	})




const currentHrs = document.getElementsByClassName('current');
const previousHrs = document.getElementsByClassName('previous');
const timeframes = document.getElementsByClassName('timeframe');

const timeList = document.getElementById('time-list').querySelectorAll('li');

function addActiveClass(items, target) {
	items.forEach(item => {
		if (item.classList.contains('active')) {
			item.classList.remove('active')
		}
	})
	target.classList.add('active')
}

timeList.forEach(item => {
	item.addEventListener('click', e => {
		addActiveClass(timeList, e.target)
		for (let i = 0; i < timeObj.length; i++) {
			currentHrs[i].textContent = timeObj[i]['timeframes'][e.target.textContent.toLowerCase()].current + 'hrs';
			previousHrs[i].textContent = timeObj[i]['timeframes'][e.target.textContent.toLowerCase()].previous + 'hrs';
			switch (e.target.textContent) {
				case 'Daily':
					timeframes[i].textContent = 'Day';
					break;
				case 'Weekly':
					timeframes[i].textContent = 'Week';
					break;
				case 'Monthly':
					timeframes[i].textContent = 'Month';
					break;

			}
		}
	})
})

