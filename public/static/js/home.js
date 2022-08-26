const date = new Date();
var Fulldate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
console.log(Fulldate)

async function getEvents() {
    const data = await axios.get("http://localhost:5000/v1/calendar")
    
    console.log(data.data)

    return (data.data);
}

getEvents().then (
    function (data){
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            timeZone: 'local',
            eventClick: function(info) {
                var eventObj = info.event;

                if (eventObj.url) {
                    alert(
                        'Clicked ' + eventObj.title + '.\n' +
                        'Will open ' + eventObj.url + ' in a new tab'
                    );

                    window.open(eventObj.url);

                    info.jsEvent.preventDefault();
                } else {
                    alert('Clicked ' + eventObj.title);
                }
            },dateClick: function(info) {
                alert('Clicked on: ' + info.dateStr);
                alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                alert('Current view: ' + info.view.type);
                info.dayEl.style.backgroundColor = 'red';
            },

            initialView: 'dayGridMonth',
            initialDate: '2022-07-22',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            
            events: data,
            businessHours: {
                daysOfWeek: [ 0, 2, 3, 4, 5, 6 ],

                startTime: '6:00',
                endTime: '18:00',
            }
        });

        calendar.render()
    }
)
    




