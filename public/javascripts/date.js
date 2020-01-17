// DATE
const 	selectDay 	= document.querySelector('.selectDay'),
		selectMonth = document.querySelector('.selectMonth'),
		selectYear 	= document.querySelector('.selectYear');


// Select Days
const 	min = 1,
    	max = 31;

for (var i = min; i<=max; i++){
    let opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    selectDay.appendChild(opt);
}


//Select Months
const monthNames = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September",
					"October", "November", "December"];

	for(var i = 0; i< monthNames.length; i++){
		let opt = document.createElement('option');
		opt.value = monthNames[i];
		opt.textContent = monthNames[i];
		selectMonth.appendChild(opt);
	}


//Select Years
const 	minYear = 1920,
    	maxYear = 2020;

for (var i = maxYear; i>=minYear; i--){
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    selectYear.appendChild(opt);
}