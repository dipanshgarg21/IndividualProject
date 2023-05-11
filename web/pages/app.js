const API_URL = 'https://api-individual.onrender.com/api';
const MQTT_URL = 'https://mqtt-individual.onrender.com/mqttvalues';

$(`#newDevice`).on('click', (event) => {
  event.preventDefault();
  const name = $('#deviceName').val();
  const user = $('#userName').val();
  const room = $('#room').val();
  const category = $('#category').val();

  const body = {
    name,
    user,
    room,
    category
  };

  $.post(`${API_URL}/devices`, body)
    .then(response => {
      console.log(body.category);
      location.href = `show-devices.html`;
    })
    .catch(error => {
      console.error(`Error: ${error}`);
    });
});

// Fetch devices and populate the dropdown
$.get(`${API_URL}/devices`)
  .then(response => {
    if (Array.isArray(response)) {
      response.forEach(device => {
        addDeviceToTable(device);
      });
    }
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });

$('#deleteDevice').on('click', (event) => {
  const name = $('#delete-device-name').val();
  const user = $('#delete-user-name').val();
  const room = $('#delete-room').val();
  const category = $('#delete-category').val();

  const body = {
    name,
    user,
    room,
    category,
  };

  $.ajax({
    url: `${API_URL}/devices`,
    method: 'DELETE',
    data: body,
    success: (response) => {
      console.log('Device deleted:', response);
      location.reload();
    },
    error: (error) => {
      console.error('Error deleting device:', error);
    }
  });
});


$.get(`${API_URL}/lightDevices`)
  .then(response => {
    response.forEach(device => {
      $('#lightBody').append(`
				<tr>
				    <td>${device.light}</td>
				    <td>${device.brightness}</td>
					<td style="background: ${device.color}"></td>
				</tr>`
      );
    });
  })

$.get(`${API_URL}/acDevices`)
  .then(response => {
    response.forEach(device => {
      $('#current-temp').append(`
				${device.temperature}`
      );
      $('#current-fan').append(`
				${device.fanSpeed}`
      );
      $('#current-mode').append(`
				${device.mode}`
      );
    });
  })

$.get(`${API_URL}/securityDevices`)
  .then(response => {
    response.forEach(device => {
      $('#door1state').append(`
				${device.door1}`
      );
      $('#door2state').append(`
				${device.door2}`
      );
      $('#window1state').append(`
				${device.window1}`
      );
    });
  })

$('#submit-light1').on('click', function (event) {
  event.preventDefault();
  const light = 1;
  const brightness = $('#light1-dropdown').val();
  const color = $('#light1-color').val();

  const body = {
    light,
    brightness,
    color
  }

  $.post(`${API_URL}/lightDevices`, body)
    .then(response => {
      console.log("done");
      alert("Status updated!!");
      location.reload();
    })
    .catch(error => {
      console.log(error);
    });
});

$('#submit-light2').on('click', function (event) {
  event.preventDefault();
  const light = 2;
  const brightness = $('#light2-dropdown').val();
  const color = $('#light2-color').val();

  const body = {
    light,
    brightness,
    color
  }

  $.post(`${API_URL}/lightDevices`, body)
    .then(response => {
      console.log("done");
      alert("Status updated!!");
      location.reload();
    })
    .catch(error => {
      console.log(error);
    });
  });
  $('#submit-light3').on('click', function (event) {
  event.preventDefault();
  const light = 3;
  const brightness = $('#light3-dropdown').val();
  const color = $('#light3-color').val();

  const body = {
    light,
    brightness,
    color
  }

  $.post(`${API_URL}/lightDevices`, body)
    .then(response => {
      console.log("done");
      alert("Status updated!!");
      location.reload();
    })
    .catch(error => {
      console.log(error);
    });
});

$('#subac').on('click', function (event) {
  event.preventDefault();
  const id = 1;
  const temperature = $('#temprature').val();
  const fanSpeed = $('#fanSpeed').val();
  const mode = $('#mode-select').val();

  const acbody = {
    id,
    temperature,
    fanSpeed,
    mode
  }
  console.log(acbody);
  $.post(`${API_URL}/acDevices`, acbody)
    .then(response => {
      console.log("done");
      alert("Status updated!!");
      location.reload();
    })
    .catch(error => {
      console.log(error);
    });
  // location.reload();
})

$('#subsec').on('click', (event) => {
  event.preventDefault();
  var id = 1;
  var door1 = $('#door1').val();
  var door2 = $('#door2').val();
  var window1 = $('#window1').val();

  const sec = {
    id: id,
    door1,
    door2,
    window1
  }

  $.post(`${API_URL}/securityDevices`, sec)
    .then(response => {
      // location.href = '/security';
      console.log("done");
      alert("Status updated!!");
      location.reload();
    })
    .catch(error => {
      console.log(error);
    });
});

function addDeviceToTable(device) {
  // Add device to the table
  $('#MainTable tbody').append(`
    <tr>
      <td>${device.name}</td>
      <td>${device.user}</td>
      <td>${device.room}</td>
      <td>${device.category}</td>
    </tr>
  `);
}

var ultrasensordata = [];
var datedata = [];
var motionsensordata = [];

$.get(`${MQTT_URL}/mqtt-values`)
  .then(response => {
    response.forEach(device =>
      ultrasensordata.push(device.ultradata)
    )

    response.forEach(device =>
      motionsensordata.push(device.motiondata)
    )

    response.forEach(device =>
      datedata.push(device.date)
    )

    let timechart = datedata.map(function (time) {
      let timeParts = time.split(":");
      let hours = parseInt(timeParts[0]);
      let minutes = parseInt(timeParts[1]);
      let seconds = parseInt(timeParts[2]);

      return Math.floor(minutes + seconds / 3600);
    });

    const numericYArray = ultrasensordata.map(val => parseFloat(val));

    Highcharts.chart('my-plot', {
      title: {
        text: 'Graph b/w tds value and time'
      },
      xAxis: {
        title: {
          text: 'Time (in hours)'
        },
        categories: timechart
      },
      yAxis: {
        title: {
          text: 'tds value'
        },
      },
      series: [{
        data: numericYArray
      }]
    });

    const numericYArray1 = motionsensordata.map(val => parseFloat(val));

    Highcharts.chart('plot', {
      title: {
        text: 'Graph b/w tds value and time'
      },
      xAxis: {
        title: {
          text: 'Time (in hours)'
        },
        categories: timechart
      },
      yAxis: {
        title: {
          text: 'tds value'
        },
      },
      series: [{
        data: numericYArray1
      }]
    });

  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
