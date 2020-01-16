// DATE
var selectDay = document.querySelector('.selectDay'),
	selectMonth = document.querySelector('.selectMonth'),
	selectYear = document.querySelector('.selectYear');

// select days

var min = 1,
    max = 31;

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    selectDay.appendChild(opt);
}

//select months

var monthNames = ["January", "February", "March",
				"April", "May", "June",
				"July", "August", "September",
				"October", "November", "December"];

	for(var i = 0; i< monthNames.length; i++){
		var opt = document.createElement('option');
		opt.value = monthNames[i];
		opt.textContent = monthNames[i];
		selectMonth.appendChild(opt);
	}

//select years

var min = 1920,
    max = 2020;

for (var i = max; i>=min; i--){
    var opt = document.createElement('option');
    opt.value = i;
    opt.textContent = i;
    selectYear.appendChild(opt);
}