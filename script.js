document.addEventListener('DOMContentLoaded', function () {
    const countryInput = document.getElementById('country');
    const getDataButton = document.querySelector('.btn-success');

    getDataButton.addEventListener('click', function () {
        const country = countryInput.value.trim();

        const apiUrl = `https://covid-193.p.rapidapi.com/statistics?country=${country}`;
        const apiKey = '';

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com',
            },
        };

        fetch(apiUrl, options)
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                if (data && data.results > 0) {
                    const result = data.response[0];

                    // Update content of the cards with the fetched data
                    document.getElementById('active-cases').textContent = result.cases.active ?? 0;
                    document.getElementById('new-cases').textContent = result.cases.new ?? 0;
                    document.getElementById('recovered-cases').textContent = result.cases.recovered ?? 0;
                    document.getElementById('total-cases').textContent = result.cases.total ?? 0;
                    document.getElementById('total-death').textContent = result.deaths.total ?? 0;
                    document.getElementById('total-tests').textContent = result.tests.total ?? 0;
                } else {
                    alert('Data not found for the specified country or invalid country.');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching data. Please try again.');
            });
    });
});
